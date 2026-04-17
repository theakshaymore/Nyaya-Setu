import { assertSupabaseConfigured, supabase } from '../supabaseClient.js'
import { HttpError } from '../utils/httpError.js'

function mapLlmConfigError(error) {
  if (error?.code === 'PGRST205') {
    return new HttpError(
      500,
      'The llm_config table is missing. Run backend/sql/001_create_llm_config.sql in Supabase first.'
    )
  }

  return error
}

export async function getOrCreateLlmConfig() {
  assertSupabaseConfigured()

  const { data, error } = await supabase
    .from('llm_config')
    .select('id, use_local_llm, updated_at')
    .eq('id', 1)
    .maybeSingle()

  if (error) {
    throw mapLlmConfigError(error)
  }

  if (data) {
    return data
  }

  const { data: insertedConfig, error: insertError } = await supabase
    .from('llm_config')
    .upsert(
      {
        id: 1,
        use_local_llm: false
      },
      {
        onConflict: 'id'
      }
    )
    .select('id, use_local_llm, updated_at')
    .single()

  if (insertError) {
    throw mapLlmConfigError(insertError)
  }

  return insertedConfig
}

export async function getUseLocalLlm() {
  const config = await getOrCreateLlmConfig()
  return config.use_local_llm ?? false
}
