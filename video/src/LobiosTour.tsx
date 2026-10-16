import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import React from "react";
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
    { id: "titulo-" + p.id, duracao: DURACAO_TITULO, el: <TituloPerfil perfil={p} /> },
    { id: "tour-" + p.id, duracao: duracaoTour(p), el: <Tour perfil={p} /> },
  ]),
  { id: "conectado", duracao: DURACAO_CONECTADO, el: <Conectado /> },
  { id: "final", duracao: DURACAO_FINAL, el: <Final /> },
];

export const DURACAO_TOTAL = cenas.reduce((s, c) => s + c.duracao, 0) - TRANSICAO * (cenas.length - 1);

export const LobiosTour: React.FC = () => (
  <TransitionSeries>
    {cenas.map((c, k) => (
      <React.Fragment key={c.id}>
        {k > 0 && (
          <TransitionSeries.Transition
            presentation={c.id.startsWith("tour-") ? slide({ direction: "from-right" }) : fade()}
            timing={linearTiming({ durationInFrames: TRANSICAO })}
          />
        )}
        <TransitionSeries.Sequence durationInFrames={c.duracao}>{c.el}</TransitionSeries.Sequence>
      </React.Fragment>
    ))}
  </TransitionSeries>
);
