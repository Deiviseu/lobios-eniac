import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Inter variável, guardada no projeto para renderizar sem depender da internet.
loadFont({
  family: "Inter",
  url: staticFile("fonts/inter-latin-wght-normal.woff2"),
  weight: "100 900",
  format: "woff2",
});

export const fontFamily = "Inter, sans-serif";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Cores tiradas do próprio sistema (botão, títulos e fundo do login).
export const cor = {
  roxo: "#7c3aed",
  roxoClaro: "#a78bfa",
  lilas: "#ddd6fe",
  fundoEscuro: "#0d0717",
  fundoRoxo: "#2e1065",
  texto: "#f5f3ff",
  textoSuave: "#c4b5fd",
  verde: "#4ade80",
};
