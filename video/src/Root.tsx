import { Composition } from "remotion";
import { DURACAO_TOTAL, LobiosTour } from "./LobiosTour";
import { FPS, HEIGHT, WIDTH } from "./theme";

// Renderizar: npx remotion render LobiosTour out/lobios-tour.mp4
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LobiosTour"
      component={LobiosTour}
      durationInFrames={DURACAO_TOTAL}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
