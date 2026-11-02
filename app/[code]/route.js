import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
export async function GET(request, { params }) { try { const { code } = await params;
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from("links")
  .select("original_url")
  .eq("code", code)
  .single();

if (error || !data) {
  return new Response("Lien introuvable.", { status: 404 });
}

return Response.redirect(data.original_url, 302);
} catch (error) { console.error(error); return new Response("Une erreur est survenue.", { status: 500 }); } }
