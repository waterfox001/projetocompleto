export interface CityItinerary {
  hubId: string;
  category: string;
  categoryLabel: string;
  durationHours: number;
  title: string;
  steps: {
    timeOffset: string;
    action: string;
    description: string;
    type: 'locker' | 'transit' | 'activity' | 'return';
  }[];
}

export const CITY_ITINERARIES: CityItinerary[] = [
  {
    hubId: 'fortaleza',
    category: 'praia',
    categoryLabel: 'Praia & Beira-Mar',
    durationHours: 5,
    title: 'Giro Tropical sem Bagagem: Orla e Caranguejo',
    steps: [
      { timeOffset: '00:00', action: 'Guardar malas na StopCase', description: 'Totem de autoatendimento no Piso 1 do Aeroporto Pinto Martins', type: 'locker' },
      { timeOffset: '+00:20', action: 'Uber até a Beira-Mar de Iracema', description: 'Trajeto de cerca de 18 min sem trânsito', type: 'transit' },
      { timeOffset: '+01:00', action: 'Caminhada & Água de Coco no Espigão', description: 'Brisa fresca com as mãos 100% livres', type: 'activity' },
      { timeOffset: '+02:30', action: 'Almoço com frutos do mar frescos', description: 'Restaurante na orla com vista para o mar', type: 'activity' },
      { timeOffset: '+04:00', action: 'Retorno seguro ao aeroporto', description: 'Tempo com folga de segurança para o trânsito', type: 'return' },
      { timeOffset: '+04:40', action: 'Retirada rápida no locker com QR Code', description: 'Acesso imediato para seu portão de embarque', type: 'locker' },
    ],
  },
  {
    hubId: 'sao-paulo-congonhas',
    category: 'gastronomia',
    categoryLabel: 'Gastronomia & Cultura',
    durationHours: 6,
    title: 'Paulista & Ibirapuera: O Melhor de SP em 6 Horas',
    steps: [
      { timeOffset: '00:00', action: 'Deixar bagagem na StopCase Congonhas', description: 'Piso térreo, próximo à passarela de pedestres', type: 'locker' },
      { timeOffset: '+00:20', action: 'Deslocamento ao Parque Ibirapuera', description: '12 min de carro até o Portão 7', type: 'transit' },
      { timeOffset: '+00:45', action: 'Café & Caminhada no Pavilhão da Bienal', description: 'Desfrute a arquitetura de Niemeyer sem carregar malas pesadas', type: 'activity' },
      { timeOffset: '+02:15', action: 'Almoço nos Jardins (Rua Oscar Freire)', description: 'Gastronomia cosmopolita de São Paulo', type: 'activity' },
      { timeOffset: '+04:30', action: 'Retorno a Congonhas com margem', description: 'Avenida 23 de Maio / Washington Luís', type: 'transit' },
      { timeOffset: '+05:15', action: 'Retirada com chave digital e embarque', description: 'Locker destravado direto no celular', type: 'locker' },
    ],
  },
  {
    hubId: 'recife',
    category: 'cultura',
    categoryLabel: 'Cultura & Recife Antigo',
    durationHours: 5,
    title: 'Marco Zero, Frevo & Boa Viagem',
    steps: [
      { timeOffset: '00:00', action: 'Check-in no locker StopCase REC', description: 'Área térrea do Aeroporto do Recife', type: 'locker' },
      { timeOffset: '+00:15', action: 'Passeio pela orla de Boa Viagem', description: 'A apenas 10 minutos do terminal', type: 'activity' },
      { timeOffset: '+01:45', action: 'Marco Zero & Centro de Artesanato', description: 'Caminhada cultural no Recife Antigo', type: 'activity' },
      { timeOffset: '+03:45', action: 'Retorno com margem para o voo', description: 'Translado tranquilo de volta a Guararapes', type: 'return' },
      { timeOffset: '+04:30', action: 'Retirada das malas e check-in da companhia', description: 'Pronto para seguir viagem descansado', type: 'locker' },
    ],
  },
  {
    hubId: 'salvador',
    category: 'gastronomia',
    categoryLabel: 'Acarajé & Mar',
    durationHours: 4,
    title: 'Moqueca e Vento Litorâneo sem Carregar Peso',
    steps: [
      { timeOffset: '00:00', action: 'Guardar malas no StopCase SSA', description: 'Piso 1, fácil acesso perto do conector', type: 'locker' },
      { timeOffset: '+00:15', action: 'Praia de Stella Maris / Flamengo', description: 'A poucos quilômetros do aeroporto', type: 'transit' },
      { timeOffset: '+00:45', action: 'Almoço típico baiano à beira-mar', description: 'Moqueca e caipirinha leve de frutas locais', type: 'activity' },
      { timeOffset: '+02:45', action: 'Retorno antecipado ao terminal', description: 'Sem correria e sem estresse com mala na areia', type: 'return' },
      { timeOffset: '+03:30', action: 'Abertura do locker com PIN digital', description: 'Bagagens intactas e preparadas para voar', type: 'locker' },
    ],
  },
  {
    hubId: 'porto-alegre',
    category: 'relaxar',
    categoryLabel: 'Orla & Pôr do Sol',
    durationHours: 5,
    title: 'Orla do Guaíba e Cais Embarcadero',
    steps: [
      { timeOffset: '00:00', action: 'Bagagem guardada na StopCase POA', description: 'Terminal 1 de Salgado Filho', type: 'locker' },
      { timeOffset: '+00:20', action: 'Deslocamento ao Cais Embarcadero', description: 'Via rápida pela Avenida Farrapos e Mauá', type: 'transit' },
      { timeOffset: '+00:45', action: 'Café & Chimarrão com vista para as ilhas', description: 'Aproveite o espaço sem malas tropeçando nas mesas', type: 'activity' },
      { timeOffset: '+03:00', action: 'Almoço ou lanche gaúcho tradicional', description: 'Culinária sulista no centro revitalizado', type: 'activity' },
      { timeOffset: '+04:15', action: 'Retirada das bagagens com 1 toque', description: 'Check-in aéreo pronto', type: 'locker' },
    ],
  },
];
