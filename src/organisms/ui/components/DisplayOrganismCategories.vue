<template>
  <ul>
    <li v-for="category in categories" :key="category._id">
      {{ category.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { OrganismCategoryModule } from '@/organisms/store/OrganismCategoryModule'

@Component
export default class DisplayOrganisCategories extends Vue {
  organismCategoryModule = getModule(OrganismCategoryModule)

  get categories() {
    return this.organismCategoryModule.all
  }
}
</script>
