import { AbsoluteFill } from "remotion";
import { fontFamily } from "../theme";

// Janela de navegador centralizada. O print (1920x1080) aparece em escala ESCALA;
// os filhos usam coordenadas de pixel do print.
export const ESCALA = 0.8;
const BARRA = 44;
const LARG = 1920 * ESCALA;
const ALT = 1080 * ESCALA;
const X = (1920 - LARG) / 2;
const Y = (1080 - (ALT + BARRA)) / 2;

export type Foco = [number, number, number, number];

/** Zoom e deslocamento da câmera para enquadrar `foco` (p = 0: tela inteira, p = 1: aproximado). */
export const camera = (foco: Foco, p: number) => {
  const [fx, fy, fw, fh] = foco;
  const pad = 28;
  const wx = X + fx * ESCALA - pad;
  const wy = Y + BARRA + fy * ESCALA - pad;
  const ww = fw * ESCALA + pad * 2;
  const wh = fh * ESCALA + pad * 2;
  // A parte de baixo fica livre para a legenda.
  const zAlvo = Math.min(Math.max(Math.min(1760 / ww, 600 / wh), 1), 2.1);
  const cx = wx + ww / 2;
  const cy = wy + wh / 2;
  const tx = 960 - cx * zAlvo;
  const ty = 375 - cy * zAlvo;
  return { z: 1 + (zAlvo - 1) * p, tx: tx * p, ty: ty * p };
};

export const Palco: React.FC<{
  url: string;
  z: number;
  tx: number;
  ty: number;
  children: React.ReactNode;
}> = ({ url, z, tx, ty, children }) => {
  return (
    <AbsoluteFill style={{ transformOrigin: "0 0", transform: `translate(${tx}px, ${ty}px) scale(${z})` }}>
      <div
        style={{
          position: "absolute",
          left: X,
          top: Y,
          width: LARG,
          height: ALT + BARRA,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.12)",
          background: "#1a1326",
        }}
      >
        <div
          style={{
            height: BARRA,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 18px",
            background: "#1c1528",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />
          ))}
          <div
            style={{
              marginLeft: 22,
              flex: 1,
              maxWidth: 760,
              height: 28,
              borderRadius: 8,
              background: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.75)",
              fontFamily,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: 8,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {url}
          </div>
        </div>
        <div style={{ position: "relative", width: LARG, height: ALT, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              width: 1920,
              height: 1080,
              transformOrigin: "0 0",
              transform: `scale(${ESCALA})`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Escurece tudo fora de `foco` e desenha uma borda brilhante em volta dele. */
export const Destaque: React.FC<{ foco: Foco; opacidade: number; desenho: number; z: number }> = ({
  foco,
  opacidade,
  desenho,
  z,
}) => {
  const [x, y, w, h] = foco;
  const pad = 12;
  const traco = 5 / (ESCALA * z);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - pad,
          top: y - pad,
          width: w + pad * 2,
          height: h + pad * 2,
          borderRadius: 18,
          boxShadow: `0 0 0 4000px rgba(14,8,30,${0.5 * opacidade})`,
        }}
      />
      <svg
        style={{ position: "absolute", left: x - pad, top: y - pad, overflow: "visible", opacity: opacidade }}
        width={w + pad * 2}
        height={h + pad * 2}
      >
        <rect
          x={0}
          y={0}
          width={w + pad * 2}
          height={h + pad * 2}
          rx={18}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth={traco}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - desenho}
          style={{ filter: "drop-shadow(0 0 10px rgba(139,92,246,0.9))" }}
        />
      </svg>
    </>
  );
};
