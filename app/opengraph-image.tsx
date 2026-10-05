import { ImageResponse } from "next/og";
import { site } from "@/lib/data";
import { LOGO_DOT, LOGO_PATH, LOGO_VIEWBOX } from "@/components/Logo";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#1e1e1e",
          color: "#f6f4f0",
        }}
      >
        <svg width="96" height="91" viewBox={LOGO_VIEWBOX}>
          <path d={LOGO_PATH} fill="#f6f4f0" />
          <circle {...LOGO_DOT} fill="#fb923c" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3 }}>{site.name}</div>
          <div style={{ fontSize: 36, color: "#9b978f", marginTop: 12 }}>{`${site.role} · React & Next.js`}</div>
        </div>
      </div>
    ),
    size,
  );
}
