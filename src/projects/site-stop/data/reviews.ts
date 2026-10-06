export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  city: string;
  hub: string;
  rating: number;
  category: 'Conexão' | 'Turismo' | 'Trabalho' | 'Família' | 'Check-out';
  text: string;
  hoursSaved: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Mariana Duarte',
    role: 'Arquiteta & Viajante',
    city: 'Fortaleza',
    hub: 'FOR - Pinto Martins',
    rating: 5,
    category: 'Turismo',
    text: 'Tinha 6 horas de conexão entre Fortaleza e Lisboa. Deixei minhas duas malas no locker em menos de 2 minutos pelo celular e fui almoçar na Beira-Mar. Voltei sem pressa nenhuma. Mudou completamente meu dia.',
    hoursSaved: '5h40 de liberdade',
  },
  {
    id: 'rev-2',
    author: 'Rodrigo Alcantara',
    role: 'Diretor Comercial',
    city: 'São Paulo',
    hub: 'CGH - Congonhas',
    rating: 5,
    category: 'Trabalho',
    text: 'Cheguei em Congonhas às 8h para reuniões na Faria Lima. Não fazia sentido arrastar a mala de rodinha o dia todo. O QR Code abriu o armário no instante do toque. Profissional e de outro nível.',
    hoursSaved: '8h de reuniões leves',
  },
  {
    id: 'rev-3',
    author: 'Camila & Felipe Fontes',
    role: 'Casal em férias',
    city: 'Recife',
    hub: 'REC - Guararapes',
    rating: 5,
    category: 'Check-out',
    text: 'Nosso check-out da pousada em Porto de Galinhas foi ao meio-dia, mas o voo era só às 22h. Guardamos tudo no locker G no aeroporto do Recife e passamos a tarde toda conhecendo o Recife Antigo.',
    hoursSaved: '7 horas de passeio',
  },
  {
    id: 'rev-4',
    author: 'Gustavo Silveira',
    role: 'Engenheiro de Software',
    city: 'Porto Alegre',
    hub: 'POA - Salgado Filho',
    rating: 5,
    category: 'Conexão',
    text: 'A experiência pelo celular é impecável. O mapa do aeroporto mostra exatamente onde fica e o inventário com fotos me deu total tranquilidade enquanto caminhei pela Orla do Guaíba.',
    hoursSaved: '4h livres',
  },
  {
    id: 'rev-5',
    author: 'Bárbara Meneghel',
    role: 'Mãe de 2 filhos',
    city: 'Salvador',
    hub: 'SSA - Salvador Bahia',
    rating: 5,
    category: 'Família',
    text: 'Viajar com criança pequena já é cansativo; carregar 3 malas num dia de calor em Salvador seria impossível. Colocamos tudo no locker e fomos almoçar moqueca em Stella Maris com as mãos livres.',
    hoursSaved: '6h em família',
  },
];
