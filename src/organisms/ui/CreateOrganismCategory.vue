<template>
  <form @submit.prevent="createOrganismCategory">
    <input type="text" v-model="name" />
    <input type="submit" value="Créer la catégorie d'organisme" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { OrganismCategoryModule } from '@/organisms/store/OrganismCategoryModule'

@Component
export default class CreateOrganismCategory extends Vue {
  public organismCategoryModule: OrganismCategoryModule = getModule(OrganismCategoryModule)

  public name = ''

  public createOrganismCategory() {
    if (this.name) {
      this.organismCategoryModule.create(this.name)
    }
  }
}
</script>
