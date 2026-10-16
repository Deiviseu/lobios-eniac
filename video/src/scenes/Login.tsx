import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Cursor } from "../components/Cursor";
import { Fundo } from "../components/Fundo";
import { Legenda } from "../components/Legenda";
import { Clique, Digitacao, Ding, WhooshSuave } from "../components/Sons";
import { camera, ESCALA, Palco } from "../components/Palco";
import { fontFamily } from "../theme";

export const DURACAO_LOGIN = 240;

const suave = Easing.bezier(0.65, 0, 0.35, 1);
const entre = (f: number, de: number, ate: number) =>
  interpolate(f, [de, ate], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave });

const EMAIL = "tarciofunc@teste.com";

export const Login: React.FC = () => {
  const l = useCurrentFrame();
  const p = entre(l, 18, 48) * (1 - entre(l, 205, 232));
  const { z, tx, ty } = camera([768, 340, 384, 400], p);

  const letras = Math.floor(interpolate(l, [56, 96], [0, EMAIL.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const pontos = Math.floor(interpolate(l, [104, 124], [0, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const piscando = Math.floor(l / 8) % 2 === 0;

  // Cursor: campo de e-mail -> campo de senha -> botão Entrar.
  const a = entre(l, 30, 50);
  const b = entre(l, 96, 104);
  const c = entre(l, 126, 142);
  const cx = 1300 + (900 - 1300) * a + (960 - 900) * c;
  const cy = 860 + (507 - 860) * a + (561 - 507) * b + (656 - 561) * c;
  const clique = (de: number) => interpolate(l, [de, de + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cliques = [50, 100, 144].map(clique).find((v) => v > 0 && v < 1) ?? 0;
  const apertado = l >= 144 && l < 152;
  const campo = (top: number, cor: string): React.CSSProperties => ({
    position: "absolute",
    left: 830,
    top,
    width: 262,
    height: 34,
    background: cor,
    color: "#fff",
    fontFamily,
    fontSize: 15,
    display: "flex",
    alignItems: "center",
  });

  return (
    <AbsoluteFill>
      <Fundo />
      <Palco url="lobios-eniac.vercel.app" z={z} tx={tx} ty={ty}>
        <Img src={staticFile("screens/login.png")} style={{ position: "absolute", width: 1920 }} />
        {l >= 50 && (
          <div style={campo(490, "#2e1f4b")}>
            {EMAIL.slice(0, letras)}
            {l < 100 && piscando && <span style={{ marginLeft: 1, width: 1.5, height: 18, background: "#fff" }} />}
          </div>
        )}
        {l >= 100 && (
          <div style={{ ...campo(544, "#2b1d47"), letterSpacing: 3, fontSize: 18 }}>
            {"•".repeat(pontos)}
            {l < 144 && piscando && <span style={{ marginLeft: 1, width: 1.5, height: 18, background: "#fff" }} />}
          </div>
        )}
        {apertado && (
          <div style={{ position: "absolute", left: 793, top: 635, width: 334, height: 42, borderRadius: 8, background: "rgba(0,0,0,0.18)" }} />
        )}
        <Cursor x={cx} y={cy} tamanho={40 / (ESCALA * Math.sqrt(z))} clique={cliques} />
      </Palco>
      <Legenda
        etiqueta="Acesso"
        titulo="Login"
        texto="Cada pessoa entra com e-mail e senha, e o sistema abre a área do seu perfil. No primeiro acesso, a senha provisória do RH precisa ser trocada."
        entrada={40}
        saida={DURACAO_LOGIN - 24}
      />
      <WhooshSuave em={16} />
      <Clique em={50} />
      <Digitacao em={56} duracao={40} />
      <Clique em={100} />
      <Digitacao em={104} duracao={20} inicio={45} />
      <Clique em={144} />
      <Ding em={152} />
    </AbsoluteFill>
  );
};
