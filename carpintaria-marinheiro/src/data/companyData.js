export const company = {
  name: 'Carpintaria Marinheiro',
  slogan: 'Mobiliário por Medida com Design, Rigor e Acabamento Profissional',
  description: 'Desenvolvemos cozinhas, roupeiros, móveis de casa de banho e soluções personalizadas em madeira, com atenção ao detalhe e qualidade de execução.',

  address: {
    street: 'Rua da Deveseira, Nº2091',
    locality: 'Fornelos e Queijada',
    city: 'Ponte de Lima',
    postalCode: '4990-621',
    country: 'Portugal',
    full: 'Rua da Deveseira, Nº2091, Fornelos e Queijada, Ponte de Lima 4990-621',
  },

  geo: {
    lat: 41.7621,
    lng: -8.5831,
  },

  contact: {
    phone: '+351 910 000 000',       // Substituir pelo número real
    phoneDisplay: '910 000 000',
    whatsapp: '+351910000000',       // Substituir pelo número real
    email: 'geral@carpintariamarinheiro.pt', // Substituir pelo email real
  },

  social: {
    instagram: 'https://www.instagram.com/carpintariamarinheiro',
    instagramHandle: '@carpintariamarinheiro',
  },

  hours: [
    { days: 'Segunda a Sexta', hours: '08:00 – 18:00' },
    { days: 'Sábado', hours: '08:00 – 13:00' },
    { days: 'Domingo', hours: 'Encerrado' },
  ],

  services: [
    {
      id: 'cozinhas',
      title: 'Cozinhas por Medida',
      description: 'Cozinhas totalmente personalizadas, desenhadas para o seu espaço. Do layout à escolha de materiais, cada detalhe é pensado para unir funcionalidade e design contemporâneo.',
      icon: 'kitchen',
      category: 'Cozinhas',
    },
    {
      id: 'roupeiros',
      title: 'Roupeiros e Closets',
      description: 'Roupeiros embutidos e closets desenhados para maximizar o espaço disponível, com organização inteligente e acabamentos premium.',
      icon: 'wardrobe',
      category: 'Roupeiros',
    },
    {
      id: 'casas-banho',
      title: 'Móveis de Casa de Banho',
      description: 'Soluções de mobiliário para casa de banho que combinam estética e funcionalidade, com resistência à humidade e acabamentos de qualidade.',
      icon: 'bathroom',
      category: 'Casas de Banho',
    },
    {
      id: 'quartos',
      title: 'Mobiliário de Quarto',
      description: 'Camas, mesas de cabeceira, cómodas e mobiliário completo de quarto com design coerente e materiais de qualidade superior.',
      icon: 'bedroom',
      category: 'Quartos',
    },
    {
      id: 'armarios',
      title: 'Armários Embutidos',
      description: 'Aproveitamento total do espaço com armários embutidos desenhados à medida de cada divisão, com sistemas de abertura e organização avançados.',
      icon: 'cabinet',
      category: 'Armários',
    },
    {
      id: 'moveis-tv',
      title: 'Móveis TV e Painéis Decorativos',
      description: 'Painéis ripados, móveis TV e soluções decorativas que definem o carácter visual de cada divisão, com integração de iluminação LED.',
      icon: 'tv',
      category: 'Móveis TV',
    },
    {
      id: 'personalizado',
      title: 'Mobiliário Personalizado',
      description: 'Qualquer solução de mobiliário em madeira, do conceito ao acabamento. Trabalhamos com o cliente desde o desenho até à entrega final.',
      icon: 'custom',
      category: 'Outros',
    },
    {
      id: 'montagem',
      title: 'Montagem e Instalação',
      description: 'Serviço completo de montagem e instalação em obra, com rigor técnico e cuidado na execução para garantir o resultado perfeito.',
      icon: 'install',
      category: 'Outros',
    },
  ],

  advantages: [
    {
      title: 'Soluções por Medida',
      description: 'Cada móvel é concebido especificamente para o seu espaço, sem compromissos de série.',
      icon: 'measure',
    },
    {
      title: 'Acabamentos de Qualidade',
      description: 'Utilizamos materiais e processos que garantem durabilidade e um resultado final impecável.',
      icon: 'quality',
    },
    {
      title: 'Design Funcional',
      description: 'Aliamos estética contemporânea a soluções práticas que melhoram o seu quotidiano.',
      icon: 'design',
    },
    {
      title: 'Montagem Profissional',
      description: 'Equipa especializada que garante a instalação perfeita de cada projeto.',
      icon: 'install',
    },
  ],

  areas: [
    'Ponte de Lima', 'Viana do Castelo', 'Braga', 'Barcelos', 'Esposende',
    'Arcos de Valdevez', 'Monção', 'Valença', 'Vila Verde',
  ],
}

export default company
