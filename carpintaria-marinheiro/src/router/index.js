import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: 'Carpintaria Marinheiro | Mobiliário por Medida em Ponte de Lima' },
  },
  {
    path: '/sobre',
    name: 'About',
    component: () => import('@/pages/AboutPage.vue'),
    meta: { title: 'Sobre Nós | Carpintaria Marinheiro' },
  },
  {
    path: '/servicos',
    name: 'Services',
    component: () => import('@/pages/ServicesPage.vue'),
    meta: { title: 'Serviços | Carpintaria Marinheiro' },
  },
  {
    path: '/projetos',
    name: 'Portfolio',
    component: () => import('@/pages/PortfolioPage.vue'),
    meta: { title: 'Projetos | Carpintaria Marinheiro' },
  },
  {
    path: '/contactos',
    name: 'Contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: { title: 'Contactos | Carpintaria Marinheiro' },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/pages/AdminPage.vue'),
    meta: { title: 'Administração | Carpintaria Marinheiro' },
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
})

export default router
