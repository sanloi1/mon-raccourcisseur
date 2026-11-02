import { createClient } from "@supabase/supabase-js"; import { randomBytes } from "crypto";
export const runtime = "nodejs";
export async function POST(request) { try { const { url } = await request.json();
let parsedUrl;

try {
  parsedUrl = new URL(url);
} catch {
  return Response.json(
    { error: "Adresse URL invalide." },
    { status: 400 }
  );
}

if (!["http:", "https:"].includes(parsedUrl.protocol)) {
  return Response.json(
    { error: "Seules les adresses HTTP et HTTPS sont acceptées." },
    { status: 400 }
  );
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const code = randomBytes(4).toString("hex");

const { error } = await supabase
  .from("links")
  .insert({
    code,
    original_url: parsedUrl.toString()
  });

if (error) {
  throw error;
}

const origin = new URL(request.url).origin;

return Response.json({
  shortUrl: `${origin}/${code}`
});
} catch (error) { console.error(error);
return Response.json(
  { error: "Impossible de créer le lien pour le moment." },
  { status: 500 }
);
} }
