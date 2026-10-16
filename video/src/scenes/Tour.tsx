import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Cursor } from "../components/Cursor";
import { Fundo } from "../components/Fundo";
import { Legenda } from "../components/Legenda";
import { camera, Destaque, ESCALA, Palco } from "../components/Palco";
import { Perfil, Tela } from "../data";

export const DURACAO_TELA = 180;

const suave = Easing.bezier(0.65, 0, 0.35, 1);
const entre = (f: number, de: number, ate: number) =>
  interpolate(f, [de, ate], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave });

// Centro do item no menu lateral do sistema.
const posMenu = (menu: number) => ({ x: 120, y: 128 + 56 * menu });
// Ponto onde o cursor "repousa" sobre a área destacada.
const posFoco = (t: Tela) => ({ x: t.foco[0] + t.foco[2] * 0.72, y: t.foco[1] + Math.min(t.foco[3] * 0.5, 260) });

const rota = (imagem: string) => "lobios-eniac.vercel.app/" + imagem.replace(".png", "").replace("-", "/");

export const duracaoTour = (perfil: Perfil) => perfil.telas.length * DURACAO_TELA;

export const Tour: React.FC<{ perfil: Perfil }> = ({ perfil }) => {
  const frame = useCurrentFrame();
  const D = DURACAO_TELA;
  const i = Math.min(Math.floor(frame / D), perfil.telas.length - 1);
  const l = frame - i * D;
  const tela = perfil.telas[i];
  const anterior = i > 0 ? perfil.telas[i - 1] : null;

  // Câmera: aproxima no meio da tela e volta antes da próxima.
  const p = entre(l, 30, 62) * (1 - entre(l, D - 28, D - 4));
  const { z, tx, ty } = camera(tela.foco, p);

  // Troca de print logo após o clique no menu.
  const troca = anterior ? entre(l, 18, 26) : 1;

  // Cursor: vai até o item do menu, clica e depois passa para a área destacada.
  const inicio = anterior ? posFoco(anterior) : { x: 1500, y: 980 };
  const menu = posMenu(tela.menu);
  const foco = posFoco(tela);
  const a = entre(l, 0, 16);
  const b = entre(l, 36, 72);
  const cx = inicio.x + (menu.x - inicio.x) * a + (foco.x - menu.x) * b;
  const cy = inicio.y + (menu.y - inicio.y) * a + (foco.y - menu.y) * b;
  const clique = interpolate(l, [16, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tamCursor = 40 / (ESCALA * Math.sqrt(z));

  const destaque = entre(l, 52, 66) * (1 - entre(l, D - 34, D - 20));
  const desenho = entre(l, 52, 82);

  return (
    <AbsoluteFill>
      <Fundo />
      <Palco url={rota(anterior && l < 20 ? anterior.imagem : tela.imagem)} z={z} tx={tx} ty={ty}>
        {anterior && <Img src={staticFile("screens/" + anterior.imagem)} style={{ position: "absolute", width: 1920 }} />}
        <Img src={staticFile("screens/" + tela.imagem)} style={{ position: "absolute", width: 1920, opacity: troca }} />
        <Destaque foco={tela.foco} opacidade={destaque} desenho={desenho} z={z} />
        <Cursor x={cx} y={cy} tamanho={tamCursor} clique={clique > 0 && clique < 1 ? clique : 0} />
      </Palco>
      <Legenda
        key={i}
        etiqueta={perfil.nome}
        contador={`${i + 1} / ${perfil.telas.length}`}
        titulo={tela.titulo}
        texto={tela.texto}
        entrada={i * D + 40}
        saida={i * D + D - 22}
      />
    </AbsoluteFill>
  );
};
