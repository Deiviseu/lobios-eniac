// Telas capturadas do sistema (public/screens, 1920x1080).
// foco = [x, y, largura, altura] em pixels do print: a área que a câmera aproxima e destaca.
// menu = posição do item no menu lateral (0 = primeiro), usada para o clique do cursor.

export type Tela = {
  imagem: string;
  menu: number;
  foco: [number, number, number, number];
  titulo: string;
  texto: string;
};

export type Perfil = {
  id: string;
  numero: string;
  nome: string;
  resumo: string;
  telas: Tela[];
};

export const perfis: Perfil[] = [
  {
    id: "rh",
    numero: "01",
    nome: "RH",
    resumo: "Monta a estrutura da empresa e define as regras do jogo.",
    telas: [
      {
        imagem: "rh.png",
        menu: 0,
        foco: [292, 136, 1596, 490],
        titulo: "Setores e cargos",
        texto:
          "O RH monta a estrutura da empresa: primeiro os setores e seus responsáveis, depois os cargos e o nível de cada um.",
      },
      {
        imagem: "rh-colaboradores.png",
        menu: 1,
        foco: [292, 136, 1596, 590],
        titulo: "Colaboradores",
        texto:
          "Cadastro de pessoas com perfil de acesso, setor, cargo e gestor, com busca por nome ou e-mail.",
      },
      {
        imagem: "rh-criterios.png",
        menu: 2,
        foco: [292, 136, 1596, 410],
        titulo: "Critérios de avaliação",
        texto:
          "Para cada cargo, o RH define o método de avaliação, o peso e a meta. O gestor vê esses critérios na hora de avaliar.",
      },
      {
        imagem: "rh-carreiras.png",
        menu: 3,
        foco: [292, 136, 1596, 400],
        titulo: "Planos de carreira",
        texto:
          "Define o próximo cargo de cada pessoa, a data prevista e os requisitos que faltam para chegar lá.",
      },
      {
        imagem: "rh-ferias.png",
        menu: 4,
        foco: [292, 136, 1596, 610],
        titulo: "Férias da empresa",
        texto:
          "Alerta quem ainda não tirou férias no ano, mostra quem está de férias hoje e o histórico de todos os pedidos.",
      },
      {
        imagem: "rh-treinamentos.png",
        menu: 5,
        foco: [292, 136, 1060, 610],
        titulo: "Matriz de treinamentos",
        texto:
          "Regras automáticas: quando a nota de alguém fica abaixo do mínimo em um método, os cursos ligados a ele são recomendados.",
      },
    ],
  },
  {
    id: "gestor",
    numero: "02",
    nome: "Gestor",
    resumo: "Acompanha a equipe, avalia, orienta e aprova pedidos.",
    telas: [
      {
        imagem: "gestor.png",
        menu: 0,
        foco: [292, 136, 1596, 620],
        titulo: "Equipe e desempenho",
        texto:
          "Visão geral do time: última nota, desempenho por método de avaliação, metas e férias de cada pessoa.",
      },
      {
        imagem: "gestor-aprovacoes.png",
        menu: 1,
        foco: [292, 136, 1596, 300],
        titulo: "Aprovações de férias",
        texto:
          "Os pedidos da equipe chegam aqui para aprovar ou negar, e todas as decisões ficam registradas no histórico.",
      },
      {
        imagem: "gestor-avaliacoes.png",
        menu: 2,
        foco: [292, 136, 520, 640],
        titulo: "Avaliações de desempenho",
        texto:
          "Escolha a pessoa, o método e o período e dê uma nota de 0 a 10. Os critérios definidos pelo RH aparecem como guia.",
      },
      {
        imagem: "gestor-feedbacks.png",
        menu: 3,
        foco: [292, 136, 520, 440],
        titulo: "Feedbacks",
        texto:
          "Elogios e pontos de melhoria enviados direto para a área do colaborador.",
      },
      {
        imagem: "gestor-metas.png",
        menu: 4,
        foco: [292, 136, 520, 490],
        titulo: "Metas da equipe",
        texto:
          "Crie metas com título, descrição e prazo para cada pessoa e acompanhe o andamento de todas.",
      },
      {
        imagem: "gestor-organograma.png",
        menu: 5,
        foco: [292, 130, 1600, 300],
        titulo: "Organograma",
        texto: "Setores, responsáveis e cargos da empresa em uma única visão.",
      },
    ],
  },
  {
    id: "colaborador",
    numero: "03",
    nome: "Colaborador",
    resumo: "Acompanha a própria carreira, do dia a dia ao próximo cargo.",
    telas: [
      {
        imagem: "funcionario.png",
        menu: 0,
        foco: [292, 136, 1596, 210],
        titulo: "Painel",
        texto:
          "Ao entrar, o colaborador vê um resumo das metas, das férias, do último feedback e do plano de carreira.",
      },
      {
        imagem: "funcionario-metas.png",
        menu: 1,
        foco: [292, 136, 1596, 180],
        titulo: "Minhas metas",
        texto:
          "As metas criadas pelo gestor aparecem aqui, e o colaborador atualiza o status conforme avança.",
      },
      {
        imagem: "funcionario-ferias.png",
        menu: 2,
        foco: [292, 136, 1596, 270],
        titulo: "Férias",
        texto:
          "Mostra o saldo estimado de dias, permite pedir um novo período e acompanhar a aprovação de cada pedido.",
      },
      {
        imagem: "funcionario-desempenho.png",
        menu: 3,
        foco: [292, 136, 1596, 230],
        titulo: "Avaliações e feedbacks",
        texto:
          "Tudo o que o gestor registrou: notas por período e método, comentários e feedbacks recebidos.",
      },
      {
        imagem: "funcionario-carreira.png",
        menu: 4,
        foco: [292, 136, 1596, 195],
        titulo: "Plano de carreira",
        texto:
          "O próximo cargo, a previsão com contagem de dias, os requisitos e como o cargo é avaliado.",
      },
      {
        imagem: "funcionario-treinamentos.png",
        menu: 5,
        foco: [292, 136, 1190, 700],
        titulo: "Treinamentos",
        texto:
          "Progresso de cada curso, recomendações geradas a partir das avaliações e o catálogo completo de cursos.",
      },
      {
        imagem: "funcionario-ponto.png",
        menu: 6,
        foco: [292, 136, 800, 420],
        titulo: "Registro de ponto",
        texto:
          "Marca entrada e saída com um clique e envia justificativas de ausência com documento, como um atestado.",
      },
      {
        imagem: "funcionario-meus-dados.png",
        menu: 7,
        foco: [292, 136, 1596, 478],
        titulo: "Meus dados",
        texto:
          "Em todos os perfis: atualizar nome e e-mail e trocar a senha, com as regras de segurança visíveis.",
      },
    ],
  },
];
