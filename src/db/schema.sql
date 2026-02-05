-- Tabla de posts extendida
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY,
  author_id UUID REFERENCES users(id),
  kind TEXT,
  text TEXT,
  media_urls TEXT[],
  dreamspace_ref_id UUID,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP,
  visibility_mode TEXT DEFAULT 'PUBLIC_FREE',
  unlock_price_tamv NUMERIC DEFAULT 0,
  subscription_price_monthly_tamv NUMERIC DEFAULT 0,
  access_duration_days INT,
  tachidos_count INT DEFAULT 0,
  tadehuev_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  shares_count INT DEFAULT 0,
  revenue_creator_tamv NUMERIC DEFAULT 0,
  revenue_platform_tamv NUMERIC DEFAULT 0,
  badges_used_count INT DEFAULT 0,
  badges_revenue_usd NUMERIC DEFAULT 0,
  governance_weight_tgn INT DEFAULT 0,
  staked_tgn_by_author NUMERIC DEFAULT 0,
  staked_tgn_by_community NUMERIC DEFAULT 0,
  curation_status TEXT DEFAULT 'PENDING',
  is_censored_for_public BOOLEAN DEFAULT false,
  ethical_score INT DEFAULT 0,
  risk_score INT DEFAULT 0
);

-- Tabla de comentarios
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY,
  post_id UUID REFERENCES posts(id),
  author_id UUID REFERENCES users(id),
  text TEXT,
  created_at TIMESTAMP DEFAULT now(),
  tachidos_count INT DEFAULT 0,
  tadehuev_count INT DEFAULT 0,
  badge_id UUID,
  badge_applied_at TIMESTAMP,
  priority_score INT DEFAULT 0
);

-- Tabla de wallets
CREATE TABLE IF NOT EXISTS wallets (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  balance_tamv NUMERIC DEFAULT 0,
  balance_tgn NUMERIC DEFAULT 0,
  staked_tgn NUMERIC DEFAULT 0
);

-- Tabla de insignias
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY,
  name TEXT,
  price_usd NUMERIC DEFAULT 5,
  text_color TEXT,
  background_color TEXT,
  glow_effect BOOLEAN DEFAULT false,
  particle_effect TEXT,
  sound_id TEXT,
  volume NUMERIC,
  priority_boost INT DEFAULT 0
);

-- Tabla de productos TAMV
CREATE TABLE IF NOT EXISTS tamv_products (
  id UUID PRIMARY KEY,
  kind TEXT,
  author_id UUID REFERENCES users(id),
  title TEXT,
  description TEXT,
  cover_url TEXT,
  post_id UUID REFERENCES posts(id),
  price_tamv NUMERIC,
  sold_units INT DEFAULT 0,
  revenue_creator_tamv NUMERIC DEFAULT 0,
  revenue_platform_tamv NUMERIC DEFAULT 0,
  access_duration_days INT
);
