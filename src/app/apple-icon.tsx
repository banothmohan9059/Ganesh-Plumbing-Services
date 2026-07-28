import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0ea5e9", // brand-500
          color: "white",
          fontSize: "100px",
          fontWeight: "bold",
          fontFamily: "sans-serif",
        }}
      >
        G
      </div>
    ),
    {
      ...size,
    }
  );
}
