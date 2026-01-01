-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user', 'celestial', 'guardian', 'architect', 'citizen');

-- Users table for TAMV
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  did TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  tier TEXT DEFAULT 'citizen',
  quantum_seeds BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

-- Passkeys for WebAuthn
CREATE TABLE public.passkeys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  credential_id TEXT UNIQUE NOT NULL,
  public_key TEXT NOT NULL,
  sign_count BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sessions
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  ip INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- DM-X4 Events for protocol tracking
CREATE TABLE public.dmx4_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  user_id UUID REFERENCES public.users(id),
  layer TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Metrics latency
CREATE TABLE public.metrics_latency (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  span_id TEXT,
  service TEXT,
  route TEXT,
  p50 DOUBLE PRECISION,
  p90 DOUBLE PRECISION,
  p99 DOUBLE PRECISION,
  ts TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Metrics RPS
CREATE TABLE public.metrics_rps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service TEXT,
  route TEXT,
  rps DOUBLE PRECISION,
  ts TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- DreamSpaces (XR worlds)
CREATE TABLE public.dreamspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  scene_data JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  visitors INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  template_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Channels (video/streaming)
CREATE TABLE public.channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  subscribers INTEGER DEFAULT 0,
  is_live BOOLEAN DEFAULT false,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Videos/Media content
CREATE TABLE public.media_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID REFERENCES public.channels(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  media_url TEXT,
  media_type TEXT DEFAULT 'video',
  duration INTEGER,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_live BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Groups/Communities
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  members_count INTEGER DEFAULT 1,
  is_private BOOLEAN DEFAULT false,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Trueque marketplace listings
CREATE TABLE public.trueque_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  value_qs BIGINT DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- BookPI Audit bundles
CREATE TABLE public.audit_bundles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id),
  action_type TEXT NOT NULL,
  evidence JSONB NOT NULL DEFAULT '{}',
  hash TEXT,
  anchored BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Knowledge Cells registry
CREATE TABLE public.knowledge_cells (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  version TEXT DEFAULT '1.0.0',
  status TEXT DEFAULT 'active',
  layer TEXT,
  api_endpoint TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- EOCT (Ethical Orchestration Control) logs
CREATE TABLE public.eoct_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  criteria TEXT NOT NULL,
  status TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  severity TEXT DEFAULT 'info',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Dekateotl Guardrails status
CREATE TABLE public.dekateotl_guardrails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  policy TEXT NOT NULL,
  integrity DOUBLE PRECISION DEFAULT 1.0,
  active BOOLEAN DEFAULT true,
  last_check TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passkeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dmx4_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics_latency ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics_rps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dreamspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trueque_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_cells ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eoct_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dekateotl_guardrails ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies

-- Users: public read, own write
CREATE POLICY "Users are viewable by everyone" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid()::text = id::text);

-- User roles: only admins can manage
CREATE POLICY "User roles viewable by owner" ON public.user_roles FOR SELECT USING (auth.uid()::text = user_id::text);

-- DreamSpaces: public ones visible, owners can manage
CREATE POLICY "Public dreamspaces viewable" ON public.dreamspaces FOR SELECT USING (is_public = true);
CREATE POLICY "Owners can manage dreamspaces" ON public.dreamspaces FOR ALL USING (auth.uid()::text = owner_id::text);

-- Channels: public read
CREATE POLICY "Channels are viewable" ON public.channels FOR SELECT USING (true);
CREATE POLICY "Owners can manage channels" ON public.channels FOR ALL USING (auth.uid()::text = owner_id::text);

-- Media content: public read
CREATE POLICY "Media content viewable" ON public.media_content FOR SELECT USING (true);
CREATE POLICY "Owners can manage media" ON public.media_content FOR ALL USING (auth.uid()::text = owner_id::text);

-- Groups: public ones visible
CREATE POLICY "Public groups viewable" ON public.groups FOR SELECT USING (is_private = false);
CREATE POLICY "Owners can manage groups" ON public.groups FOR ALL USING (auth.uid()::text = owner_id::text);

-- Trueque: active listings visible
CREATE POLICY "Active listings viewable" ON public.trueque_listings FOR SELECT USING (status = 'active');
CREATE POLICY "Sellers can manage listings" ON public.trueque_listings FOR ALL USING (auth.uid()::text = seller_id::text);

-- Metrics: public read for dashboards
CREATE POLICY "Metrics latency viewable" ON public.metrics_latency FOR SELECT USING (true);
CREATE POLICY "Metrics rps viewable" ON public.metrics_rps FOR SELECT USING (true);

-- DM-X4 events: public read
CREATE POLICY "DMX4 events viewable" ON public.dmx4_events FOR SELECT USING (true);

-- Knowledge cells: public read
CREATE POLICY "Knowledge cells viewable" ON public.knowledge_cells FOR SELECT USING (true);

-- EOCT logs: public read
CREATE POLICY "EOCT logs viewable" ON public.eoct_logs FOR SELECT USING (true);

-- Dekateotl: public read
CREATE POLICY "Guardrails viewable" ON public.dekateotl_guardrails FOR SELECT USING (true);

-- Audit bundles: owner only
CREATE POLICY "Audit bundles by owner" ON public.audit_bundles FOR SELECT USING (auth.uid()::text = user_id::text);

-- Passkeys: owner only
CREATE POLICY "Passkeys by owner" ON public.passkeys FOR SELECT USING (auth.uid()::text = user_id::text);

-- Sessions: owner only
CREATE POLICY "Sessions by owner" ON public.sessions FOR SELECT USING (auth.uid()::text = user_id::text);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_dreamspaces_updated_at BEFORE UPDATE ON public.dreamspaces FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_knowledge_cells_updated_at BEFORE UPDATE ON public.knowledge_cells FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();