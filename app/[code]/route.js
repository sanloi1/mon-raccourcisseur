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

const destination = JSON.stringify(data.original_url);

const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background: white;
        }
      </style>
    </head>
    <body>
      <script>
        const destination = ${destination};
        setTimeout(() => {
          window.location.replace(destination);
        }, 3000);
      </script>
    </body>
  </html>
`;

return new Response(html, {
  headers: {
    "Content-Type": "text/html; charset=utf-8"
  }
});
} catch (error) { console.error(error); return new Response("Une erreur est survenue.", { status: 500 }); } }
