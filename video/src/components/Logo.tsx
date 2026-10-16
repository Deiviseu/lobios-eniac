import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Ícone do Lobios (três nós ligados), o mesmo da tela de login, montado em animação.
export const Logo: React.FC<{ tamanho: number; inicio?: number }> = ({ tamanho, inicio = 0 }) => {
  const frame = useCurrentFrame() - inicio;
  const { fps } = useVideoConfig();
  const no = (atraso: number) =>
    spring({ frame: frame - atraso, fps, config: { damping: 12, stiffness: 160 } });
  const linha = interpolate(frame, [14, 34], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const anel = spring({ frame, fps, config: { damping: 18 } });

  return (
    <div
      style={{
        width: tamanho,
        height: tamanho,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 0 80px rgba(124,58,237,0.6), inset 0 0 30px rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${anel})`,
      }}
    >
      <svg viewBox="0 0 32 32" width={tamanho * 0.5} height={tamanho * 0.5} fill="none" color="#fff">
        <line x1="10.4" y1="14.7" x2="19.6" y2="8.3" stroke="currentColor" strokeWidth="1.6" pathLength={1} strokeDasharray={1} strokeDashoffset={linha} />
        <line x1="10.4" y1="17.3" x2="19.6" y2="23.7" stroke="currentColor" strokeWidth="1.6" pathLength={1} strokeDasharray={1} strokeDashoffset={linha} />
        <circle cx="8" cy="16" r={3 * no(2)} fill="currentColor" />
        <circle cx="22" cy="7" r={3 * no(7)} fill="currentColor" />
        <circle cx="22" cy="25" r={3 * no(12)} fill="currentColor" />
      </svg>
    </div>
  );
};
