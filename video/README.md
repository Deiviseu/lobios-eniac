# Vídeo de apresentação do Lobios

Vídeo animado (Remotion, 1920x1080, ~2min35s) que apresenta o sistema completo:
abertura, os três perfis, login e um passeio pelas telas de RH, Gestor e Colaborador,
terminando com o diagrama de como os perfis se conectam.

## Comandos

```console
npm i                                              # instalar dependências
npm run dev                                        # abrir o Remotion Studio para editar e pré-visualizar
npx remotion render LobiosTour out/lobios-tour.mp4 # renderizar o MP4
```

## Onde mudar

- `src/data.ts`: textos das legendas, ordem das telas e a área destacada (`foco`) de cada uma.
- `public/screens/`: prints do sistema (1920x1080). Para atualizar, troque o arquivo mantendo o nome.
- `src/scenes/`: cada cena do vídeo (abertura, perfis, login, título do perfil, passeio, diagrama e final).
- `src/theme.ts`: cores e fonte (Inter, guardada em `public/fonts`).

Licença do Remotion: gratuita para equipes de até 3 pessoas (https://www.remotion.dev/license).
