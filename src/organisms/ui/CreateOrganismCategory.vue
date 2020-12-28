<template>
  <form @submit.prevent="createOrganismCategory">
    <input type="text" v-model="organismCategoryName" />
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

  public organismCategoryName = ''

  public createOrganismCategory() {
    if (this.organismCategoryName) {
      this.organismCategoryModule.create(this.organismCategoryName)
    }
  }
}
</script>
