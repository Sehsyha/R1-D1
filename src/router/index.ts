import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Organism from '@/organisms/ui/pages/Organism.vue'
import Document from '@/documents/ui/pages/Document.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/organisms',
    name: 'Organisms',
    component: Organism
  },
  {
    path: '/documents',
    name: 'Documents',
    component: Document
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
