import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") ?? "The BAZ Methodology";
  const subtitle = url.searchParams.get("subtitle") ?? "Diagnose. Plan. Ship. Score. Learn.";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background: "#0e0e10",
        color: "white",
        fontFamily: "serif",
        padding: 80,
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "serif",
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "#8a8a8a",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          B
        </div>
        <span>BAZ</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 1040,
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            display: "flex",
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            background: "#8a8a8a",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 32,
            color: "#ff8b4d",
            fontFamily: "sans-serif",
            letterSpacing: "-0.01em",
            display: "flex",
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontFamily: "monospace",
          fontSize: 24,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.05em",
        }}
      >
        baz.agency/methodology
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
