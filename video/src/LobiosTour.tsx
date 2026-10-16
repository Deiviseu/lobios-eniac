import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile } from "remotion";
import { Whoosh } from "./components/Sons";
import { perfis } from "./data";
import { Abertura } from "./scenes/Abertura";
import { Conectado, DURACAO_CONECTADO } from "./scenes/Conectado";
import { DURACAO_FINAL, Final } from "./scenes/Final";
import { DURACAO_LOGIN, Login } from "./scenes/Login";
import { Perfis } from "./scenes/Perfis";
import { DURACAO_TITULO, TituloPerfil } from "./scenes/TituloPerfil";
import { duracaoTour, Tour } from "./scenes/Tour";

const DURACAO_ABERTURA = 150;
const DURACAO_PERFIS = 170;
const TRANSICAO = 16;

// Ordem: abertura, perfis, login e, para cada perfil, título + passeio pelas telas.
const cenas = [
  { id: "abertura", duracao: DURACAO_ABERTURA, el: <Abertura /> },
  { id: "perfis", duracao: DURACAO_PERFIS, el: <Perfis /> },
  { id: "login", duracao: DURACAO_LOGIN, el: <Login /> },
  ...perfis.flatMap((p) => [
    {
      id: "titulo-" + p.id,
      duracao: DURACAO_TITULO,
      el: <TituloPerfil perfil={p} />,
    },
    { id: "tour-" + p.id, duracao: duracaoTour(p), el: <Tour perfil={p} /> },
  ]),
  { id: "conectado", duracao: DURACAO_CONECTADO, el: <Conectado /> },
  { id: "final", duracao: DURACAO_FINAL, el: <Final /> },
];

export const DURACAO_TOTAL =
  cenas.reduce((s, c) => s + c.duracao, 0) - TRANSICAO * (cenas.length - 1);

// Música de fundo (áudio do vídeo enviado), com entrada e saída suaves.
const volumeMusica = (f: number) =>
  0.32 *
  interpolate(
    f,
    [0, 45, DURACAO_TOTAL - 120, DURACAO_TOTAL - 5],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

export const LobiosTour: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("audio/musica.m4a")} volume={volumeMusica} />
    <TransitionSeries>
      {cenas.map((c, k) => (
        <React.Fragment key={c.id}>
          {k > 0 && (
            <TransitionSeries.Transition
              presentation={
                c.id.startsWith("tour-")
                  ? slide({ direction: "from-right" })
                  : fade()
              }
              timing={linearTiming({ durationInFrames: TRANSICAO })}
            />
          )}
          <TransitionSeries.Sequence durationInFrames={c.duracao}>
            {c.el}
            {k > 0 && <Whoosh em={0} />}
          </TransitionSeries.Sequence>
        </React.Fragment>
      ))}
    </TransitionSeries>
  </AbsoluteFill>
);
