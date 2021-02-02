<template>
  <div id="app">
    <div id="nav">
      <router-link to="/organisms">Organismes</router-link>
      <router-link to="/documents">Documents</router-link>
      <router-link to="/transactions">Transactions</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import Component from 'vue-class-component'

import { InMemoryDefaultDataService } from '@/common/adapters/InMemoryDefaultDataService'
import { DocumentCategoryModule } from '@/documents/store/DocumentCategoryModule'
import { DocumentModule } from '@/documents/store/DocumentModule'
import { OrganismCategoryModule } from '@/organisms/store/OrganismCategoryModule'
import { OrganismModule } from '@/organisms/store/OrganismModule'
import { TransactionModule } from '@/transactions/store/TransactionModule'

@Component
export default class App extends Vue {
  organismCategoryModule = getModule(OrganismCategoryModule)
  organismModule = getModule(OrganismModule)
  documentCategoryModule = getModule(DocumentCategoryModule)
  documentModule = getModule(DocumentModule)
  transactionModule = getModule(TransactionModule)

  async mounted() {
    await InMemoryDefaultDataService.insertDefaultData()
    await this.documentCategoryModule.fetch()
    await this.documentModule.fetch()
    await this.organismCategoryModule.fetch()
    await this.organismModule.fetch()
    await this.transactionModule.fetch()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
