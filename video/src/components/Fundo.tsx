import { AbsoluteFill, useCurrentFrame } from "remotion";
import { cor } from "../theme";

// Fundo roxo com brilhos, no mesmo estilo da tela de login do sistema.
export const Fundo: React.FC = () => {
  const frame = useCurrentFrame();
  const d = Math.sin(frame / 60) * 40;
  const e = Math.cos(frame / 75) * 50;
  return (
    <AbsoluteFill style={{ backgroundColor: cor.fundoEscuro, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% ${-5 + d / 20}%, #5b21b6 0%, #3b0f80 35%, rgba(13,7,23,0) 75%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: -250 + e,
          top: 500 + d,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.35), rgba(124,58,237,0) 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          right: -300 - e,
          top: -200 - d,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.22), rgba(167,139,250,0) 65%)",
        }}
      />
      {/* textura de pontos */}
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />
    </AbsoluteFill>
  );
};
