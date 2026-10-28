import { ImageResponse } from "next/og";

export const alt = "Addis Eats";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1f3a",
        color: "white",
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700 }}>Addis Eats</div>
      <div style={{ fontSize: 40, marginTop: 16 }}>
        Ethiopian food, delivered fresh
      </div>
    </div>,
    size,
  );
}
