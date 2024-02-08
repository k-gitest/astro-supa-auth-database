/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals {
    path?: string;
    id: string;
    aud?: string;
    role?: string;
    email: string;
    email_confirmed_at?: string;
    phone?: string;
    confirmed_at?: string;
    last_sign_in_at?: string;
    app_metadata?: { provider: string; providers: string[] };
    user_metadata?: Record<string, unknown>;
    identities?: Record<string, unknown>[];
    created_at?: string;
    updated_at?: string;
  }
}
