import type { APIRoute } from "astro";
import { supabase } from '@/lib/supabase';
import { User, Session } from '@/types/user'

export const GET: APIRoute = async ({ cookies, redirect }) => {

  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  const { data, error } = await supabase.auth.setSession({
    refresh_token: refreshToken.value,
    access_token: accessToken.value,
  });

  if (error) {
    cookies.delete("sb-access-token", {
      path: "/",
    });
    cookies.delete("sb-refresh-token", {
      path: "/",
    });

    return redirect("/signin");
  }
  
  return new Response(
    JSON.stringify({
      auth: 'authState',
      user: data?.user
    })
  );
};
