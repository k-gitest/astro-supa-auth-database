import type { APIRoute } from "astro";
import { supabase } from '@/lib/supabase';

export const GET: APIRoute = async () => {
  let user;
  const waitForAuthStateChange = () => {
    return new Promise((resolve) => {
      const subscription = supabase.auth.onAuthStateChange((event, session) => {
        user = session?.user;
        resolve();
      });
    });
  };

  await waitForAuthStateChange();

  return new Response(
    JSON.stringify({
      auth: 'authState',
      user: user
    })
  );
};
