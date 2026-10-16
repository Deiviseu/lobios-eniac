import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Fundo } from "../components/Fundo";
import { Ding } from "../components/Sons";
import { cor, fontFamily } from "../theme";

export const DURACAO_CONECTADO = 220;

const nos = [
  { nome: "RH", x: 960, y: 360 },
  { nome: "Gestor", x: 1430, y: 790 },
  { nome: "Colaborador", x: 490, y: 790 },
];
const R = 115;
const centro = { x: 960, y: 650 };

const setas = [
  { de: 0, para: 1, texto: "Critérios de avaliação", atraso: 40 },
  { de: 1, para: 2, texto: "Notas, feedbacks e metas", atraso: 75 },
  { de: 2, para: 0, texto: "Desempenho gera cursos recomendados", atraso: 110 },
];

// Curva entre dois nós, empurrada para fora do centro do triângulo.
const curva = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = mx - centro.x;
  const dy = my - centro.y;
  const n = Math.hypot(dx, dy) || 1;
  const c = { x: mx + (dx / n) * 120, y: my + (dy / n) * 120 };
  const borda = (p: { x: number; y: number }) => {
    const vx = c.x - p.x;
    const vy = c.y - p.y;
    const m = Math.hypot(vx, vy);
    return { x: p.x + (vx / m) * (R + 18), y: p.y + (vy / m) * (R + 18) };
  };
  const s = borda(a);
  const e = borda(b);
  const meio = { x: 0.25 * s.x + 0.5 * c.x + 0.25 * e.x, y: 0.25 * s.y + 0.5 * c.y + 0.25 * e.y };
  const ang = (Math.atan2(e.y - c.y, e.x - c.x) * 180) / Math.PI;
  return { d: `M ${s.x} ${s.y} Q ${c.x} ${c.y} ${e.x} ${e.y}`, meio, fim: e, ang, fora: { x: dx / n, y: dy / n } };
};

export const Conectado: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entra = (atraso: number) => spring({ frame: frame - atraso, fps, config: { damping: 14, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Fundo />
      <div style={{ position: "absolute", top: 70, width: "100%", textAlign: "center", opacity: entra(0) }}>
        <div style={{ fontSize: 76, fontWeight: 800, color: "#fff", letterSpacing: -2 }}>Tudo conectado</div>
        <div style={{ fontSize: 32, color: cor.lilas, marginTop: 8 }}>
          O que um perfil registra aparece na hora para o outro.
        </div>
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {setas.map((s) => {
          const c = curva(nos[s.de], nos[s.para]);
          const t = interpolate(frame, [s.atraso, s.atraso + 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <g key={s.texto}>
              <path d={c.d} fill="none" stroke={cor.roxoClaro} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} style={{ filter: "drop-shadow(0 0 10px rgba(167,139,250,0.8))" }} />
              <polygon
                points="0,-14 26,0 0,14"
                fill={cor.roxoClaro}
                opacity={t > 0.95 ? 1 : 0}
                transform={`translate(${c.fim.x}, ${c.fim.y}) rotate(${c.ang}) translate(-18, 0)`}
              />
            </g>
          );
        })}
      </svg>
      {setas.map((s) => {
        const c = curva(nos[s.de], nos[s.para]);
        const e = entra(s.atraso + 18);
        return (
          <div
            key={s.texto}
            style={{
              position: "absolute",
              left: c.meio.x + c.fora.x * 70,
              top: c.meio.y + c.fora.y * 50,
              transform: `translate(-50%, -50%) scale(${0.6 + 0.4 * e})`,
              opacity: e,
              fontSize: 27,
              fontWeight: 600,
              color: "#fff",
              whiteSpace: "nowrap",
              background: "rgba(16,9,34,0.9)",
              border: "1px solid rgba(167,139,250,0.45)",
              padding: "10px 22px",
              borderRadius: 999,
            }}
          >
            {s.texto}
          </div>
        );
      })}
      {nos.map((n, k) => {
        const e = entra(8 + k * 8);
        return (
          <div
            key={n.nome}
            style={{
              position: "absolute",
              left: n.x - R,
              top: n.y - R,
              width: R * 2,
              height: R * 2,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%, #8b5cf6, ${cor.roxo} 55%, #4c1d95)`,
              boxShadow: "0 0 60px rgba(124,58,237,0.7), inset 0 0 0 2px rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: n.nome.length > 6 ? 30 : 42,
              fontWeight: 800,
              transform: `scale(${e})`,
            }}
          >
            {n.nome}
          </div>
        );
      })}
      <Ding em={138} />
    </AbsoluteFill>
  );
};
