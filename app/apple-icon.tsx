import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f5f4ef" }}>
      <svg viewBox="0 0 100 100" width="180" height="180">
        <path fill="#17181b" fillRule="evenodd" d="M22 17h29c15.5 0 24 7.3 24 20 0 10.1-5.8 16.5-15.6 18.8L77 83H64L48 58H34v25H22V17Zm12 10v21h16c8.1 0 12.7-3.6 12.7-10.6S58.1 27 50 27H34Z" />
        <rect x="79" y="75" width="8" height="8" fill="#a2660c" />
      </svg>
    </div>,
    size,
  );
}
