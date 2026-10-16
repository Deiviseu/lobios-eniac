// Ponteiro do mouse com efeito de clique (onda). Coordenadas no espaço do print.
export const Cursor: React.FC<{
  x: number;
  y: number;
  tamanho: number;
  clique: number; // 0 = parado, 0..1 = progresso da onda do clique
  opacidade?: number;
}> = ({ x, y, tamanho, clique, opacidade = 1 }) => {
  const apertado = clique > 0 && clique < 0.35 ? 0.85 : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: opacidade, pointerEvents: "none" }}>
      {clique > 0 && clique < 1 && (
        <div
          style={{
            position: "absolute",
            left: -tamanho * 1.4 * clique,
            top: -tamanho * 1.4 * clique,
            width: tamanho * 2.8 * clique,
            height: tamanho * 2.8 * clique,
            borderRadius: "50%",
            border: `${tamanho * 0.12}px solid rgba(167,139,250,${1 - clique})`,
            background: `rgba(124,58,237,${0.25 * (1 - clique)})`,
          }}
        />
      )}
      <svg
        width={tamanho}
        height={tamanho}
        viewBox="0 0 24 24"
        style={{
          transform: `scale(${apertado})`,
          transformOrigin: "0 0",
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.45))",
        }}
      >
        <path
          d="M3 2 L3 19 L7.5 14.8 L10.4 21.5 L13.4 20.2 L10.6 13.7 L16.8 13.7 Z"
          fill="#ffffff"
          stroke="#111827"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
