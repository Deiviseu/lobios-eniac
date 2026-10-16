import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Fundo } from "../components/Fundo";
import { perfis } from "../data";
import { cor, fontFamily } from "../theme";

export const Perfis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entra = (atraso: number) => spring({ frame: frame - atraso, fps, config: { damping: 16, stiffness: 100 } });

  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center", justifyContent: "center" }}>
      <Fundo />
      <div style={{ textAlign: "center", opacity: entra(0), transform: `translateY(${(1 - entra(0)) * 30}px)` }}>
        <div style={{ fontSize: 76, fontWeight: 800, color: "#fff", letterSpacing: -2 }}>Uma plataforma, três perfis</div>
        <div style={{ fontSize: 34, color: cor.lilas, marginTop: 12 }}>
          Cada pessoa entra e vê exatamente o que precisa.
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", gap: 40, marginTop: 70 }}>
        {perfis.map((p, k) => {
          const s = entra(18 + k * 10);
          return (
            <div
              key={p.id}
              style={{
                width: 500,
                padding: "40px 40px 44px",
                borderRadius: 32,
                background: "rgba(20,11,40,0.82)",
                border: "1px solid rgba(167,139,250,0.35)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
                opacity: s,
                transform: `translateY(${(1 - s) * 80}px)`,
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 800, color: cor.roxoClaro, letterSpacing: 3 }}>{p.numero}</div>
              <div style={{ fontSize: 56, fontWeight: 800, color: "#fff", marginTop: 6 }}>{p.nome}</div>
              <div style={{ fontSize: 28, color: cor.lilas, marginTop: 14, lineHeight: 1.4, minHeight: 80 }}>{p.resumo}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
                {p.telas.map((t, j) => {
                  const c = entra(34 + k * 10 + j * 3);
                  return (
                    <span
                      key={t.titulo}
                      style={{
                        fontSize: 19,
                        fontWeight: 600,
                        color: "#ede9fe",
                        background: "rgba(124,58,237,0.3)",
                        borderRadius: 999,
                        padding: "6px 14px",
                        opacity: c,
                        transform: `scale(${0.7 + 0.3 * c})`,
                      }}
                    >
                      {t.titulo}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
