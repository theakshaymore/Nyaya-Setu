CREATE TABLE IF NOT EXISTS public.llm_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  use_local_llm BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.llm_config (id, use_local_llm)
VALUES (1, FALSE)
ON CONFLICT (id) DO NOTHING;
