<template>
  <form @submit.prevent="createOrganism">
    <input type="text" v-model="organismName" />
    <select v-model="categoryId">
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
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
  organismCategoryModule: OrganismCategoryModule = getModule(OrganismCategoryModule)
  organismModule: OrganismModule = getModule(OrganismModule)
  organismName = ''
  categoryId = ''

  get categories() {
    return this.organismCategoryModule.all
  }

  createOrganism() {
    if (this.organismName && this.categoryId) {
      const payload: CreateOrganismPayload = {
        name: this.organismName,
        categoryId: this.categoryId
      }

      this.organismModule.create(payload)
    }
  }
}
</script>
