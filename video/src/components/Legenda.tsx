import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cor, fontFamily } from "../theme";

// Cartão de legenda fixo na parte de baixo da tela.
export const Legenda: React.FC<{
  etiqueta: string;
  contador?: string;
  titulo: string;
  texto: string;
  entrada: number;
  saida: number;
}> = ({ etiqueta, contador, titulo, texto, entrada, saida }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sobe = spring({ frame: frame - entrada, fps, config: { damping: 16, stiffness: 120 } });
  const some = interpolate(frame, [saida, saida + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textoEntra = interpolate(frame, [entrada + 8, entrada + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const op = sobe * (1 - some);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 46,
        width: 1480,
        transform: `translate(-50%, ${(1 - sobe) * 60 + some * 30}px)`,
        opacity: op,
        fontFamily,
        display: "flex",
        borderRadius: 28,
        overflow: "hidden",
        background: "rgba(16,9,34,0.9)",
        border: "1px solid rgba(167,139,250,0.35)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ width: 10, background: `linear-gradient(${cor.roxoClaro}, ${cor.roxo})` }} />
      <div style={{ padding: "28px 44px 32px 40px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#fff",
              background: cor.roxo,
              padding: "5px 14px",
              borderRadius: 999,
            }}
          >
            {etiqueta}
          </span>
          {contador && <span style={{ fontSize: 20, color: cor.textoSuave, fontWeight: 600 }}>{contador}</span>}
        </div>
        <div style={{ fontSize: 50, fontWeight: 800, color: "#fff", letterSpacing: -1, lineHeight: 1.1 }}>
          {titulo}
        </div>
        <div
          style={{
            fontSize: 29,
            color: cor.lilas,
            marginTop: 10,
            lineHeight: 1.4,
            opacity: textoEntra,
            transform: `translateY(${(1 - textoEntra) * 10}px)`,
          }}
        >
          {texto}
        </div>
      </div>
    </div>
  );
};
