import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://baz.agency";
    const staticPaths = [
      "", "/about", "/our-story", "/services", "/case-studies", "/industries",
      "/insights", "/contact", "/pricing", "/methodology", "/marketing-hub",
      "/stance", "/vs-others", "/book", "/brandbook", "/privacy", "/terms",
    ];
    const urls = staticPaths.map((path) => `  <url><loc>${baseUrl}${path}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
    return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || String(err) }, { status: 500 });
  }
}
