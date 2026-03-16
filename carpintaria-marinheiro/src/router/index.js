import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      title: 'Carpintaria Marinheiro | Mobiliário por Medida em Ponte de Lima',
      description: 'Cozinhas, roupeiros, móveis de casa de banho e soluções personalizadas em madeira com atenção ao detalhe. Carpintaria Marinheiro, Ponte de Lima.',
    },
  },
  {
    path: '/sobre',
    name: 'About',
    component: () => import('@/pages/AboutPage.vue'),
    meta: {
      title: 'Sobre Nós | Carpintaria Marinheiro',
      description: 'Conheça a Carpintaria Marinheiro — experiência, dedicação e rigor em mobiliário por medida para interiores residenciais.',
    },
  },
  {
    path: '/servicos',
    name: 'Services',
    component: () => import('@/pages/ServicesPage.vue'),
    meta: {
      title: 'Serviços | Cozinhas, Roupeiros e Mobiliário por Medida',
      description: 'Cozinhas por medida, roupeiros, armários embutidos, móveis de casa de banho, painéis decorativos e muito mais.',
    },
  },
  {
    path: '/projetos',
    name: 'Portfolio',
    component: () => import('@/pages/PortfolioPage.vue'),
    meta: {
      title: 'Projetos | Portefólio Carpintaria Marinheiro',
      description: 'Veja os nossos trabalhos mais recentes — cozinhas, roupeiros, casas de banho e mobiliário personalizado por medida.',
    },
  },
  {
    path: '/contactos',
    name: 'Contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: {
      title: 'Contactos | Pedir Orçamento | Carpintaria Marinheiro',
      description: 'Contacte a Carpintaria Marinheiro para pedir orçamento. Estamos em Ponte de Lima.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
  const desc = document.querySelector('meta[name="description"]')
  if (desc && to.meta?.description) desc.setAttribute('content', to.meta.description)
})

export default router
