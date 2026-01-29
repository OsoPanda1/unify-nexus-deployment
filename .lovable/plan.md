

# PLAN MAESTRO: EVOLUCIÓN TOTAL TAMV MD-X4 CON 7 CAPAS FEDERADAS

## DIAGNÓSTICO DEL ESTADO ACTUAL

### Componentes existentes
- **Base de datos**: 16 tablas con RLS implementado (users, channels, groups, dreamspaces, media_content, trueque_listings, etc.)
- **Frontend**: Dashboard con secciones para Isabella, DreamSpaces, Trueque, KAOS Audio, Channels, Groups, MediaFeed, Memberships
- **Navegación**: Sidebar con secciones principales
- **Imágenes**: Assets generados para thumbnails y banners

### Elementos faltantes identificados
1. **Muro de publicaciones (Social Feed)** - Posts, fotos, videos, musica
2. **Sistema de chat/DMs** - Mensajería directa entre usuarios
3. **Conciertos sensoriales** - Eventos XR en vivo
4. **Puentes de conocimiento** - Knowledge bridges
5. **Lotería TAMV** - Sistema de rifas/sorteos
6. **Universidad TAMV (UTAMV)** - Cursos y educación
7. **Autenticación** - Login/Registro de usuarios
8. **Edge functions backend** - APIs para CRUD real
9. **Sistema de notificaciones** - Alertas en tiempo real
10. **Seguridad avanzada** - Protección de datos personales

---

## ARQUITECTURA DE 7 CAPAS FEDERADAS

```text
┌─────────────────────────────────────────────────────────────┐
│  L7: META-GOBERNANZA (DAO, Dekateotl, Arbitraje)           │
├─────────────────────────────────────────────────────────────┤
│  L6: MEDICIÓN & ECONOMÍA (KPIs, Reparto 20/30/50, BookPI)  │
├─────────────────────────────────────────────────────────────┤
│  L5: SEGURIDAD & PRIVACIDAD (Anubis, Zero Trust, ID-NVIDA) │
├─────────────────────────────────────────────────────────────┤
│  L4: EXPERIENCIA XR/AI (DreamSpaces, KAOS Audio, Isabella) │
├─────────────────────────────────────────────────────────────┤
│  L3: APIs FEDERADAS (QuantumPods, REST, WebSocket)         │
├─────────────────────────────────────────────────────────────┤
│  L2: MODELO LÓGICO (Grafo TAMV, Embeddings, Relaciones)    │
├─────────────────────────────────────────────────────────────┤
│  L1: PROPÓSITO INSTITUCIONAL (Misión, Ética, Roles)        │
└─────────────────────────────────────────────────────────────┘
```

---

## FASE 1: PRIMER PLANO VISUAL (SOCIAL COMPLETO)

### 1.1 Muro de Publicaciones (Social Feed)
**Nuevas tablas SQL:**
```sql
-- Posts/Publicaciones
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  media_types TEXT[] DEFAULT '{}',
  visibility TEXT DEFAULT 'public',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Comentarios
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Likes
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL, -- 'post', 'comment', 'media'
  target_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, target_type, target_id)
);

-- Follows/Seguidores
CREATE TABLE public.follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(follower_id, following_id)
);
```

**Nuevo componente**: `src/components/dashboard/SocialFeedSection.tsx`
- Feed de posts con fotos/videos/música
- Composer para crear publicaciones
- Sistema de likes y comentarios
- Compartir contenido

### 1.2 Sistema de Chat/DMs
**Nuevas tablas:**
```sql
-- Conversaciones DM
CREATE TABLE public.dm_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_ids UUID[] NOT NULL,
  is_paid_session BOOLEAN DEFAULT false,
  session_price INTEGER DEFAULT 0,
  status TEXT DEFAULT 'open',
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Mensajes
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES public.dm_threads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'text',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Membresías de grupos
CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);
```

**Nuevo componente**: `src/components/dashboard/MessagingSection.tsx`
- Lista de conversaciones estilo Telegram
- Chat en tiempo real con WebSocket
- Mensajes con media (fotos, audio, video)

### 1.3 Conciertos Sensoriales
**Nueva tabla:**
```sql
CREATE TABLE public.concerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  stream_url TEXT,
  dreamspace_id UUID REFERENCES public.dreamspaces(id),
  kaos_preset_id TEXT,
  ticket_price INTEGER DEFAULT 0,
  capacity INTEGER DEFAULT 1000,
  attendees_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'scheduled',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.concert_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  concert_id UUID REFERENCES public.concerts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  ticket_type TEXT DEFAULT 'general',
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(concert_id, user_id)
);
```

**Nuevo componente**: `src/components/dashboard/ConcertsSection.tsx`
- Grid de eventos en vivo y programados
- Integración con DreamSpaces y KAOS Audio
- Sistema de tickets y asistencia

### 1.4 Puentes de Conocimiento (Knowledge Bridges)
**Nueva tabla:**
```sql
CREATE TABLE public.knowledge_bridges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  source_cell_id UUID REFERENCES public.knowledge_cells(id),
  target_cell_id UUID REFERENCES public.knowledge_cells(id),
  bridge_type TEXT DEFAULT 'bidirectional',
  strength DOUBLE PRECISION DEFAULT 1.0,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Nuevo componente**: `src/components/dashboard/KnowledgeBridgesSection.tsx`
- Visualización de conexiones entre KnowledgeCells
- Grafo interactivo de conocimiento
- Creación de nuevos puentes

### 1.5 Lotería TAMV
**Nuevas tablas:**
```sql
CREATE TABLE public.lotteries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  prize_pool INTEGER DEFAULT 0,
  ticket_price INTEGER DEFAULT 10,
  max_tickets INTEGER DEFAULT 10000,
  sold_tickets INTEGER DEFAULT 0,
  winner_id UUID REFERENCES public.users(id),
  status TEXT DEFAULT 'active',
  draw_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.lottery_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lottery_id UUID REFERENCES public.lotteries(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  ticket_number INTEGER NOT NULL,
  purchased_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(lottery_id, ticket_number)
);
```

**Nuevo componente**: `src/components/dashboard/LotterySection.tsx`
- Loterías activas con countdown
- Compra de boletos
- Historial de ganadores

### 1.6 Universidad TAMV (UTAMV)
**Nuevas tablas:**
```sql
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instructor_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  price INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  category TEXT,
  level TEXT DEFAULT 'beginner',
  duration_hours INTEGER DEFAULT 1,
  enrolled_count INTEGER DEFAULT 0,
  rating DOUBLE PRECISION DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

CREATE TABLE public.course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT DEFAULT 'video',
  content_url TEXT,
  duration_minutes INTEGER DEFAULT 10,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(course_id, user_id)
);

CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE,
  certificate_hash TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT now(),
  bookpi_anchor_id UUID REFERENCES public.audit_bundles(id)
);
```

**Nuevo componente**: `src/components/dashboard/UniversitySection.tsx`
- Catálogo de cursos
- Player de contenido educativo
- Sistema de certificaciones con BookPI

---

## FASE 2: SEGUNDO PLANO (SISTEMAS DE SEGURIDAD Y DEVHUB)

### 2.1 Sistema de Notificaciones
**Nueva tabla:**
```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'message', 'like', 'follow', 'economy', 'security'
  title TEXT NOT NULL,
  body TEXT,
  payload JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Actualización**: Habilitar Realtime para notificaciones

### 2.2 Sistema de Autenticación Completo
**Nuevos archivos:**
- `src/pages/Auth.tsx` - Página de login/registro
- `src/hooks/useAuth.ts` - Hook de autenticación
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegisterForm.tsx`
- `src/components/auth/ProtectedRoute.tsx`

### 2.3 Edge Functions Backend
**Nuevas edge functions:**
```
supabase/functions/
├── health/index.ts          # Health check
├── isabella-chat/index.ts   # Chat con Isabella IA
├── bookpi-log/index.ts      # Registro de auditoría
├── metrics-ingest/index.ts  # Ingesta de métricas
├── trueque-match/index.ts   # Matching de ofertas
└── notifications/index.ts   # Push notifications
```

### 2.4 Panel de Seguridad (Anubis)
**Nuevo componente**: `src/components/dashboard/SecuritySection.tsx`
- Dashboard de amenazas detectadas
- Logs de actividad sospechosa
- Panel de rollback
- Estado de Dekateotl Guardrails

### 2.5 DevHub Mejorado
**Actualización de**: `src/components/dashboard/DevHubSection.tsx`
- Documentación OpenAPI interactiva
- Ejemplos de código con copy
- Playground para probar APIs
- Métricas de uso por endpoint

---

## FASE 3: TERCER PLANO (INFORMACIÓN Y DOCUMENTACIÓN)

### 3.1 Corrección de Seguridad de Datos Personales
**Políticas RLS adicionales:**
```sql
-- Ocultar email de usuarios en lecturas públicas
CREATE POLICY "Users cannot see other emails" ON public.users 
  FOR SELECT USING (
    auth.uid()::text = id::text 
    OR email IS NULL
  );

-- Crear vista segura de usuarios públicos
CREATE VIEW public.public_profiles AS
SELECT 
  id,
  display_name,
  avatar_url,
  tier,
  created_at
FROM public.users;
```

### 3.2 Sidebar Actualizado con Todas las Secciones
**Estructura de navegación completa:**
```typescript
const navItems = [
  // Primer plano - Social
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'feed', label: 'Muro Social', icon: Newspaper },
  { id: 'messages', label: 'Mensajes', icon: MessageCircle },
  { id: 'channels', label: 'Canales', icon: Radio },
  { id: 'groups', label: 'Grupos', icon: Users },
  { id: 'divider1' },
  // Experiencias
  { id: 'dreamspaces', label: 'DreamSpaces', icon: Sparkles },
  { id: 'concerts', label: 'Conciertos', icon: Music },
  { id: 'kaos', label: 'KAOS Audio', icon: Volume2 },
  { id: 'trueque', label: 'Trueque', icon: ShoppingBag },
  { id: 'lottery', label: 'Lotería', icon: Ticket },
  { id: 'university', label: 'UTAMV', icon: GraduationCap },
  { id: 'divider2' },
  // Sistema
  { id: 'isabella', label: 'Isabella IA', icon: Brain },
  { id: 'cells', label: 'KnowledgeCells', icon: Boxes },
  { id: 'bridges', label: 'Puentes', icon: GitBranch },
  { id: 'bookpi', label: 'BookPI', icon: FileCheck },
  { id: 'memberships', label: 'Memberships', icon: Crown },
  { id: 'divider3' },
  // DevOps
  { id: 'devhub', label: 'DevHub', icon: Code },
  { id: 'security', label: 'Seguridad', icon: Shield },
  { id: 'metrics', label: 'Métricas', icon: Activity },
  { id: 'layers', label: 'Arquitectura', icon: Layers },
  { id: 'federation', label: 'Federación', icon: Globe },
];
```

---

## RESUMEN DE ARCHIVOS A CREAR/MODIFICAR

### Nuevos Componentes
1. `src/components/dashboard/SocialFeedSection.tsx` - Muro de publicaciones
2. `src/components/dashboard/MessagingSection.tsx` - Sistema de chat
3. `src/components/dashboard/ConcertsSection.tsx` - Conciertos sensoriales
4. `src/components/dashboard/KnowledgeBridgesSection.tsx` - Puentes de conocimiento
5. `src/components/dashboard/LotterySection.tsx` - Lotería TAMV
6. `src/components/dashboard/UniversitySection.tsx` - Universidad TAMV
7. `src/components/dashboard/SecuritySection.tsx` - Panel Anubis
8. `src/pages/Auth.tsx` - Autenticación
9. `src/hooks/useAuth.ts` - Hook de auth
10. `src/components/auth/*.tsx` - Componentes de auth

### Archivos a Actualizar
1. `src/components/layout/Sidebar.tsx` - Nueva navegación
2. `src/components/dashboard/DashboardContent.tsx` - Nuevas secciones
3. `src/components/dashboard/DevHubSection.tsx` - Mejoras
4. `src/App.tsx` - Nuevas rutas

### Nueva Migración SQL
- Tablas: posts, comments, likes, follows, dm_threads, messages, group_members, concerts, concert_attendees, knowledge_bridges, lotteries, lottery_tickets, courses, course_modules, enrollments, certificates, notifications
- Políticas RLS para proteger datos personales
- Vistas públicas seguras

### Edge Functions
1. `supabase/functions/health/index.ts`
2. `supabase/functions/isabella-chat/index.ts`
3. `supabase/functions/bookpi-log/index.ts`
4. `supabase/functions/metrics-ingest/index.ts`
5. `supabase/functions/trueque-match/index.ts`
6. `supabase/functions/notifications/index.ts`

---

## MODELO ECONÓMICO INTEGRADO (20+ FUENTES DE INGRESO)

El sistema implementará el reparto **20/30/50**:
- 20% Protocolo Fénix (comunidad)
- 30% Infraestructura
- 50% Utilidad neta

### Fuentes de monetización implementadas:
1. Membresías (Free, Creador, Gremial, VIP, Celestial, Enterprise)
2. Comisiones Trueque (25-35%)
3. Tickets de conciertos
4. Cursos UTAMV (25% comisión)
5. Boletos de lotería
6. Tips/Gifts XR
7. Marketplace DreamSpaces
8. Suscripciones a canales premium
9. Grupos privados de pago
10. DMs de sesión pagada
11. Licencias Isabella IA
12. Consultoría constitucional
13. Certificaciones con BookPI
14. Assets 3D/NFT marketplace
15. Patrocinios y marca
16. Hosting XR premium
17. API DevHub enterprise
18. White-label TAMV
19. Merch conectado
20. Datos agregados (anonimizados)

---

## ORDEN DE IMPLEMENTACIÓN

1. **Migración SQL** - Crear todas las tablas nuevas con RLS
2. **Autenticación** - Login/Registro funcional
3. **Social Feed** - Muro de publicaciones
4. **Messaging** - Sistema de chat
5. **Conciertos** - Eventos XR
6. **Universidad** - Cursos
7. **Lotería** - Sistema de rifas
8. **Puentes** - Knowledge bridges
9. **Seguridad** - Panel Anubis mejorado
10. **Edge Functions** - Backend APIs
11. **Notificaciones** - Realtime
12. **DevHub** - Documentación mejorada

