"use client";
import { useState } from "react";
export default function Home() { const [url, setUrl] = useState(""); const [shortUrl, setShortUrl] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
async function shortenLink(e) { e.preventDefault(); setLoading(true); setError(""); setShortUrl("");
try {
  const response = await fetch("/api/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error || "Une erreur est survenue"); 

  setShortUrl(data.shortUrl);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
}
return ( <main style={{ minHeight: "100vh", background: "#f4f6fb", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "Arial, sans-serif" }}> <div style={{ background: "white", padding: "40px", borderRadius: "20px", maxWidth: "520px", width: "100%", boxShadow: "0 10px 40px #00000012" }}> <h1 style={{textAlign:"center", color:"#243b70"}}> MonRaccourci </h1>
    <p style={{textAlign:"center", color:"#64748b"}}>
      Raccourcissez vos liens en quelques secondes.
    </p>

    <form onSubmit={shortenLink}>
      <input
        type="url"
        required
        placeholder="Collez votre lien ici..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width:"100%",
          padding:"15px",
          border:"1px solid #ddd",
          borderRadius:"10px",
          boxSizing:"border-box",
          marginTop:"20px",
          fontSize:"16px"
        }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          width:"100%",
          padding:"15px",
          marginTop:"15px",
          background:"#3155d9",
          color:"white",
          border:0,
          borderRadius:"10px",
          fontSize:"16px",
          cursor:"pointer"
        }}
      >
        {loading ? "Patientez..." : "Raccourcir mon lien"}
      </button>
    </form>

    {error && (
      <p style={{color:"red"}}>{error}</p>
    )}

    {shortUrl && (
      <div style={{
        marginTop:"25px",
        padding:"15px",
        background:"#eef4ff",
        borderRadius:"10px"
      }}>
        <p>Votre lien court :</p>
        <a href={shortUrl} target="_blank" rel="noreferrer">
          {shortUrl}
        </a>
        <button
          onClick={() => navigator.clipboard.writeText(shortUrl)}
          style={{
            display:"block",
            marginTop:"15px",
            padding:"10px 20px",
            background:"#243b70",
            color:"white",
            border:0,
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Copier le lien
        </button>
      </div>
    )}
  </div>
</main>
); }
