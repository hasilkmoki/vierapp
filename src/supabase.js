import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const BUCKET = 'wedding-ar';
export const configError =
  !url || !key || url.includes('YOUR-PROJECT') || key.includes('YOUR-ANON')
    ? 'This viewer is not configured yet (missing Supabase URL / anon key at build time).'
    : null;

// no-store: always read the latest published target set; the .mind files themselves are versioned/immutable.
export const supabase = configError
  ? null
  : createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (u, o) => fetch(u, { ...o, cache: 'no-store' }) },
    });

export const publicUrl = (path) => supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
