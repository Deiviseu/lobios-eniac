import { Audio, Sequence, staticFile } from "remotion";

// Efeitos sonoros (public/audio). `em` = frame da cena em que o som começa.
type Som = { em: number; volume?: number };

export const Whoosh: React.FC<Som> = ({ em, volume = 0.5 }) => (
  <Sequence from={em} durationInFrames={20} layout="none">
    <Audio src={staticFile("audio/whoosh.mp3")} volume={volume} />
  </Sequence>
);

export const WhooshSuave: React.FC<Som> = ({ em, volume = 0.3 }) => (
  <Sequence from={em} durationInFrames={34} layout="none">
    <Audio src={staticFile("audio/whoosh-suave.mp3")} volume={volume} />
  </Sequence>
);

export const Ding: React.FC<Som> = ({ em, volume = 0.45 }) => (
  <Sequence from={em} durationInFrames={74} layout="none">
    <Audio src={staticFile("audio/ding.mp3")} volume={volume} />
  </Sequence>
);

// O primeiro estalo do clique fica em 0,15 s do arquivo: corta antes para cair no frame certo.
export const Clique: React.FC<Som> = ({ em, volume = 1.2 }) => (
  <Sequence from={em} durationInFrames={15} layout="none">
    <Audio src={staticFile("audio/clique.mp3")} trimBefore={4} volume={volume} />
  </Sequence>
);

// Trecho contínuo da gravação de teclado (sem pausas até 3,3 s).
export const Digitacao: React.FC<Som & { duracao: number; inicio?: number }> = ({
  em,
  duracao,
  inicio = 0,
  volume = 1,
}) => (
  <Sequence from={em} durationInFrames={duracao} layout="none">
    <Audio
      src={staticFile("audio/digitacao.mp3")}
      trimBefore={inicio}
      volume={(f) => volume * Math.min(1, f / 3, (duracao - f) / 4)}
    />
  </Sequence>
);
