// Projetos iniciais de demonstração
// Estes são substituídos pelos dados do localStorage quando o admin adiciona projetos

export const STORAGE_KEY = 'cm_projects'

export const defaultProjects = [
  {
    id: '1',
    title: 'Cozinha Moderna em Branco Mate',
    category: 'Cozinhas',
    description: 'Cozinha por medida com acabamento mate, ilha central e iluminação LED integrada.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    featured: true,
    createdAt: '2024-11-01',
  },
  {
    id: '2',
    title: 'Roupeiro Embutido com LED',
    category: 'Roupeiros',
    description: 'Roupeiro do chão ao tecto com iluminação LED integrada e sistema de organização interior.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    featured: true,
    createdAt: '2024-10-20',
  },
  {
    id: '3',
    title: 'Móvel de Casa de Banho',
    category: 'Casas de Banho',
    description: 'Móvel de casa de banho em madeira com lavatório de encastrar e acabamento lacado.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    featured: false,
    createdAt: '2024-10-10',
  },
  {
    id: '4',
    title: 'Painel Ripado com Iluminação',
    category: 'Móveis TV',
    description: 'Painel ripado decorativo com iluminação LED embutida para sala de estar.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    featured: true,
    createdAt: '2024-09-25',
  },
  {
    id: '5',
    title: 'Cozinha Aberta com Península',
    category: 'Cozinhas',
    description: 'Cozinha aberta com península em tampo de pedra e armários até ao tecto.',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
    featured: false,
    createdAt: '2024-09-15',
  },
  {
    id: '6',
    title: 'Quarto Completo por Medida',
    category: 'Quartos',
    description: 'Mobiliário completo de quarto — cama, roupeiro, mesas de cabeceira em acabamento cinza.',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
    featured: false,
    createdAt: '2024-09-01',
  },
  {
    id: '7',
    title: 'Armários Embutidos no Corredor',
    category: 'Armários',
    description: 'Aproveitamento total do espaço do corredor com armários embutidos e portas de correr.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    featured: false,
    createdAt: '2024-08-20',
  },
  {
    id: '8',
    title: 'Móvel TV Suspenso',
    category: 'Móveis TV',
    description: 'Móvel TV suspenso com prateleiras e sistema de iluminação LED embutido.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    featured: false,
    createdAt: '2024-08-05',
  },
]

export const categories = [
  'Todos',
  'Cozinhas',
  'Roupeiros',
  'Casas de Banho',
  'Quartos',
  'Móveis TV',
  'Armários',
  'Outros',
]

// Load projects from localStorage, fallback to defaults
export function loadProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return [...defaultProjects]
}

// Save projects to localStorage
export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    return true
  } catch {
    return false
  }
}

// Generate unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
