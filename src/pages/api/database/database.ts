import type { APIRoute } from "astro";
import { supabase } from '@/lib/supabase';

export const GET: APIRoute = async ({ params, request, redirect }) => {

  let dataDB = []
  try {
  
    const { data, error } = await supabase.from('todo').select('*')
    
    if (error) {
        return new Response(error.message, { status: 400 });
    } else {
      dataDB = data
    }
    
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(
    JSON.stringify({
      todo: dataDB
    })
  );
};