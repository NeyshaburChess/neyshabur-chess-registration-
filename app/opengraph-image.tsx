import { ImageResponse } from "next/og";
 
export const runtime = "edge";
 
export const alt = "هیأت شطرنج شهرستان نیشابور";
export const size = {
  width: 1200,
  height: 630,
};
 
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#07192f",
          color: "white",
          direction: "rtl",
          fontSize: 60,
        }}
      >
        <div
          style={{
            fontSize: 70,
            fontWeight: 800,
            marginBottom: 30,
          }}
        >
          ♟ هیأت شطرنج شهرستان نیشابور
        </div>
 
        <div
          style={{
            fontSize: 40,
            color: "#d4af37",
          }}
        >
          سامانه ثبت نام مسابقات شطرنج
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
 