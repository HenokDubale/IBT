import { ImageResponse } from "next/og";
import { getDish } from "../data";

export const alt = "Dish preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0b1f3a",
        color: "white",
      }}
    >
      <div style={{ fontSize: 28, color: "#93c5fd" }}>
        {dish ? dish.category : "Addis Eats"}
      </div>
      <div style={{ fontSize: 80, fontWeight: 700, marginTop: 16 }}>
        {dish ? dish.name : "Dish not found"}
      </div>
      {dish && (
        <div style={{ fontSize: 56, marginTop: 24, color: "#fbbf24" }}>
          {dish.price} birr
        </div>
      )}
      <div style={{ fontSize: 32, marginTop: 40 }}>Addis Eats</div>
    </div>,
    size,
  );
}
