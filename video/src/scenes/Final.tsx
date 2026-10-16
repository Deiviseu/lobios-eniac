import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Fundo } from "../components/Fundo";
import { Logo } from "../components/Logo";
import { cor, fontFamily } from "../theme";

export const DURACAO_FINAL = 165;

const stack = ["Angular", "FastAPI", "Supabase", "Firestore", "Vercel"];

export const Final: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entra = (atraso: number) => spring({ frame: frame - atraso, fps, config: { damping: 18, stiffness: 110 } });

  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center", justifyContent: "center" }}>
      <Fundo />
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 44 }}>
        <Logo tamanho={180} />
        <div style={{ opacity: entra(14), transform: `translateX(${(1 - entra(14)) * -40}px)` }}>
          <div style={{ fontSize: 150, fontWeight: 800, color: "#fff", letterSpacing: -5, lineHeight: 1 }}>Lobios</div>
          <div style={{ fontSize: 42, color: cor.lilas, marginTop: 10 }}>Plataforma de Gestão de Carreira</div>
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", gap: 14, marginTop: 80 }}>
        {stack.map((s, k) => {
          const e = entra(40 + k * 5);
          return (
            <span
              key={s}
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#ede9fe",
                border: "1px solid rgba(167,139,250,0.45)",
                borderRadius: 999,
                padding: "8px 20px",
                opacity: e,
                transform: `translateY(${(1 - e) * 20}px)`,
              }}
            >
              {s}
            </span>
          );
        })}
      </div>
      <div style={{ position: "relative", fontSize: 28, color: "rgba(221,214,254,0.8)", marginTop: 44, opacity: interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        Desafio proposto pela Lobios · Programa de projetos ENIAC
      </div>
    </AbsoluteFill>
  );
};
