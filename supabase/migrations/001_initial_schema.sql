-- ============================================================
-- Smailing · Esquema inicial
-- Ejecutar en Supabase SQL Editor o con supabase db push
-- ============================================================

-- ── peso_registros ──────────────────────────────────────────
-- Registro diario de peso corporal
create table if not exists peso_registros (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users not null,
  fecha       date not null,
  peso        numeric(5, 2) not null,
  created_at  timestamptz default now(),
  unique (user_id, fecha)
);

alter table peso_registros enable row level security;

create policy "own_peso_select" on peso_registros
  for select using (auth.uid() = user_id);
create policy "own_peso_insert" on peso_registros
  for insert with check (auth.uid() = user_id);
create policy "own_peso_update" on peso_registros
  for update using (auth.uid() = user_id);
create policy "own_peso_delete" on peso_registros
  for delete using (auth.uid() = user_id);

-- ── medidas ─────────────────────────────────────────────────
-- Mediciones corporales mensuales (cintura, abdomen, etc.)
create table if not exists medidas (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users not null,
  fecha       date not null,
  metrica     text not null,   -- 'cintura' | 'abdomen' | 'cadera' | etc.
  valor       numeric(6, 2) not null,
  created_at  timestamptz default now(),
  unique (user_id, fecha, metrica)
);

alter table medidas enable row level security;

create policy "own_medidas_select" on medidas
  for select using (auth.uid() = user_id);
create policy "own_medidas_insert" on medidas
  for insert with check (auth.uid() = user_id);
create policy "own_medidas_update" on medidas
  for update using (auth.uid() = user_id);
create policy "own_medidas_delete" on medidas
  for delete using (auth.uid() = user_id);

-- ── checklist_state ─────────────────────────────────────────
-- Estado diario del checklist (offline-first, sincronizado)
create table if not exists checklist_state (
  user_id     uuid references auth.users not null,
  fecha       date not null,
  item_id     text not null,
  checked     boolean default false,
  updated_at  timestamptz default now(),
  primary key (user_id, fecha, item_id)
);

alter table checklist_state enable row level security;

create policy "own_checklist_select" on checklist_state
  for select using (auth.uid() = user_id);
create policy "own_checklist_insert" on checklist_state
  for insert with check (auth.uid() = user_id);
create policy "own_checklist_update" on checklist_state
  for update using (auth.uid() = user_id);
create policy "own_checklist_delete" on checklist_state
  for delete using (auth.uid() = user_id);

-- ── función updated_at automático ──────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger trg_checklist_updated_at
  before update on checklist_state
  for each row execute procedure set_updated_at();
