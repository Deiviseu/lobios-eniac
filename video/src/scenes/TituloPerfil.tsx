import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Fundo } from "../components/Fundo";
import { Perfil } from "../data";
import { cor, fontFamily } from "../theme";

export const DURACAO_TITULO = 96;

export const TituloPerfil: React.FC<{ perfil: Perfil }> = ({ perfil }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entra = (atraso: number) => spring({ frame: frame - atraso, fps, config: { damping: 17, stiffness: 110 } });
  const linha = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily, justifyContent: "center", paddingLeft: 200 }}>
      <Fundo />
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 120,
          fontSize: 560,
          fontWeight: 800,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "3px rgba(167,139,250,0.35)",
          opacity: entra(0),
          transform: `translateX(${(1 - entra(0)) * 120}px)`,
        }}
      >
        {perfil.numero}
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 6, color: cor.roxoClaro, opacity: entra(4) }}>
          PERFIL
        </div>
        <div
          style={{
            fontSize: 150,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: -4,
            lineHeight: 1.05,
            opacity: entra(8),
            transform: `translateY(${(1 - entra(8)) * 40}px)`,
          }}
        >
          {perfil.nome}
        </div>
        <div style={{ width: 520 * linha, height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${cor.roxoClaro}, ${cor.roxo})`, marginTop: 18 }} />
        <div style={{ fontSize: 40, color: cor.lilas, marginTop: 28, maxWidth: 1100, opacity: entra(20) }}>{perfil.resumo}</div>
      </div>
    </AbsoluteFill>
  );
};
