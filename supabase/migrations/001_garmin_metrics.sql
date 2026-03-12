-- Tabla para métricas sincronizadas desde Garmin Connect
CREATE TABLE IF NOT EXISTS garmin_metrics (
  id            SERIAL PRIMARY KEY,
  date          DATE NOT NULL DEFAULT CURRENT_DATE,
  hrv_7d_avg    NUMERIC,
  hrv_status    TEXT,
  body_battery  INTEGER,
  vo2max        NUMERIC,
  training_status     TEXT,
  training_load_ratio NUMERIC,
  fitness_age   INTEGER,
  sleep_score   INTEGER,
  sleep_hours   NUMERIC,
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date)
);

ALTER TABLE garmin_metrics ENABLE ROW LEVEL SECURITY;

-- Lectura pública (anon key puede leer)
CREATE POLICY "anon_read" ON garmin_metrics
  FOR SELECT USING (true);

-- Solo el service role puede escribir
CREATE POLICY "service_write" ON garmin_metrics
  FOR ALL USING (auth.role() = 'service_role');
