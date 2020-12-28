<template>
  <form @submit.prevent="createOrganism">
    <input type="text" v-model="organismName" />
    <select v-model="organismCategoryId">
      <option value="">Pas de catégorie</option>
      <option
        v-for="category in categories"
        :key="category._id"
        :value="category._id"
      >
        {{ category.name }}
      </option>
    </select>
    <input type="submit" value="Créer l'organisme" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { CreateOrganismPayload } from '@/organisms/store/payloads'
import { OrganismModule } from '@/organisms/store/OrganismModule'
import { OrganismCategoryModule } from '@/organisms/store/OrganismCategoryModule'

@Component
export default class CreateOrganism extends Vue {
  public organismCategoryModule: OrganismCategoryModule = getModule(OrganismCategoryModule)
  public organismModule: OrganismModule = getModule(OrganismModule)

  public organismName = ''
  public organismCategoryId = ''

  get categories() {
    return this.organismCategoryModule.all
  }

  public createOrganism() {
    if (this.organismName && this.organismCategoryId) {
      const payload: CreateOrganismPayload = {
        name: this.organismName,
        categoryId: this.organismCategoryId
      }

      this.organismModule.create(payload)
    }
  }
}
</script>
