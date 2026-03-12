#!/usr/bin/env node
/**
 * garmin-sync.js — Sincroniza datos de Garmin Connect a Supabase
 *
 * Uso:
 *   GARMIN_EMAIL=tu@email.com GARMIN_PASSWORD=tupass node scripts/garmin-sync.js
 *
 * O crea un archivo .env.sync (NO se sube a git) con:
 *   GARMIN_EMAIL=...
 *   GARMIN_PASSWORD=...
 *   SUPABASE_URL=...
 *   SUPABASE_SERVICE_KEY=...
 */

import 'dotenv/config'
import { GarminConnect } from 'garmin-connect'
import { createClient } from '@supabase/supabase-js'

const GARMIN_EMAIL       = process.env.GARMIN_EMAIL
const GARMIN_PASSWORD    = process.env.GARMIN_PASSWORD
const SUPABASE_URL       = process.env.SUPABASE_URL       || 'https://oyzizvozhgcgwyuvifes.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!GARMIN_EMAIL || !GARMIN_PASSWORD || !SUPABASE_SERVICE_KEY) {
  console.error('Faltan variables: GARMIN_EMAIL, GARMIN_PASSWORD, SUPABASE_SERVICE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

function today() {
  return new Date().toISOString().split('T')[0]
}

function safeGet(fn, fallback = null) {
  try { return fn() } catch { return fallback }
}

async function fetchGarminData() {
  const gc = new GarminConnect({ username: GARMIN_EMAIL, password: GARMIN_PASSWORD })
  await gc.login()
  console.log('✅ Login Garmin OK')

  const date = new Date()
  const dateStr = today()
  const results = {}

  // HRV
  try {
    const hrv = await gc.getHrvData(date)
    results.hrv_7d_avg = safeGet(() => hrv.hrvSummary?.weeklyAvg)
    results.hrv_status = safeGet(() => hrv.hrvSummary?.status)
    console.log('  HRV:', results.hrv_7d_avg, results.hrv_status)
  } catch (e) { console.warn('  HRV no disponible:', e.message) }

  // Body Battery
  try {
    const bb = await gc.getBodyBattery([dateStr])
    results.body_battery = safeGet(() => bb?.[0]?.charged)
    console.log('  Body Battery:', results.body_battery)
  } catch (e) { console.warn('  Body Battery no disponible:', e.message) }

  // VO2Max y Fitness Age
  try {
    const maxMetrics = await gc.getMaxMetrics(date)
    results.vo2max      = safeGet(() => maxMetrics?.vo2MaxPreciseValue ?? maxMetrics?.vo2MaxValue)
    results.fitness_age = safeGet(() => maxMetrics?.fitnessAge?.fitnessAge)
    console.log('  VO2Max:', results.vo2max, '| Fitness Age:', results.fitness_age)
  } catch (e) { console.warn('  Max metrics no disponible:', e.message) }

  // Training Status & Load
  try {
    const ts = await gc.getTrainingStatus(date)
    results.training_status      = safeGet(() => ts?.latestTrainingStatusData?.trainingStatus?.trainingStatusPhrase)
    results.training_load_ratio  = safeGet(() => ts?.latestTrainingStatusData?.trainingLoadBalance?.loadRatio)
    console.log('  Training Status:', results.training_status, '| Load Ratio:', results.training_load_ratio)
  } catch (e) { console.warn('  Training status no disponible:', e.message) }

  // Sueño
  try {
    const sleep = await gc.getSleepData(date)
    results.sleep_score = safeGet(() => sleep?.dailySleepDTO?.sleepScores?.overall?.value)
    const secs = safeGet(() => sleep?.dailySleepDTO?.sleepTimeSeconds)
    results.sleep_hours = secs ? Math.round(secs / 360) / 10 : null
    console.log('  Sleep Score:', results.sleep_score, '| Horas:', results.sleep_hours)
  } catch (e) { console.warn('  Sueño no disponible:', e.message) }

  return { date: dateStr, ...results, updated_at: new Date().toISOString() }
}

async function upsertToSupabase(data) {
  const { error } = await supabase
    .from('garmin_metrics')
    .upsert(data, { onConflict: 'date' })

  if (error) throw error
  console.log('✅ Datos guardados en Supabase para', data.date)
}

async function main() {
  console.log('🔄 Iniciando sincronización Garmin → Supabase...')
  try {
    const data = await fetchGarminData()
    await upsertToSupabase(data)
    console.log('✅ Sincronización completada')
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

main()
