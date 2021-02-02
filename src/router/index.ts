import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Organism from '@/organisms/ui/pages/Organism.vue'
import Document from '@/documents/ui/pages/Document.vue'
import Transaction from '@/transactions/ui/pages/Transaction.vue'

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
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transaction
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
