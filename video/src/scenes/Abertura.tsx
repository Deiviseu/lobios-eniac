import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Fundo } from "../components/Fundo";
import { Ding } from "../components/Sons";
import { Logo } from "../components/Logo";
import { cor, fontFamily } from "../theme";

const temas = ["Metas", "Desempenho", "Treinamentos", "Férias", "Ponto"];

export const Abertura: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entra = (atraso: number) => spring({ frame: frame - atraso, fps, config: { damping: 18, stiffness: 110 } });
  const nome = "Lobios".split("");

  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center", justifyContent: "center" }}>
      <Fundo />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Logo tamanho={170} />
        <div style={{ display: "flex", marginTop: 36 }}>
          {nome.map((letra, k) => {
            const s = entra(22 + k * 3);
            return (
              <span
                key={k}
                style={{
                  fontSize: 168,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: -5,
                  opacity: s,
                  transform: `translateY(${(1 - s) * 50}px)`,
                  textShadow: "0 10px 60px rgba(124,58,237,0.7)",
                }}
              >
                {letra}
              </span>
            );
          })}
        </div>
        <div
          style={{
            fontSize: 46,
            color: cor.lilas,
            fontWeight: 500,
            marginTop: 4,
            opacity: entra(45),
            transform: `translateY(${(1 - entra(45)) * 20}px)`,
          }}
        >
          Plataforma de Gestão de Carreira
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 48 }}>
          {temas.map((t, k) => {
            const s = entra(66 + k * 5);
            return (
              <div
                key={t}
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: "#fff",
                  padding: "12px 26px",
                  borderRadius: 999,
                  background: "rgba(124,58,237,0.28)",
                  border: "1px solid rgba(167,139,250,0.5)",
                  opacity: s,
                  transform: `scale(${0.6 + 0.4 * s})`,
                }}
              >
                {t}
              </div>
            );
          })}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "rgba(221,214,254,0.75)",
            marginTop: 56,
            opacity: interpolate(frame, [100, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          num só lugar, para colaboradores, gestores e RH
        </div>
      </div>
      <Ding em={24} />
    </AbsoluteFill>
  );
};
