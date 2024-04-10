import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/auth', component: () => import('@/components/AuthorizeComponent.vue'), name: 'auth', props: { pageTitle: 'LeadHit'}  },
  { path: '/analytics', component: () => import('@/components/AnalyticsComponent.vue'), name: 'analytics', props: { pageTitle: 'Аналитика' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async(to) => {
  if (!localStorage.getItem('leadhit-site-id') && to.name !== 'auth') {
    return({ name: 'auth' });
  }
  document.title = to?.matched[0]?.props?.default?.pageTitle;
})