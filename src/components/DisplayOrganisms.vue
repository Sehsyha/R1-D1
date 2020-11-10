<template>
  <div>
    <div v-for="organism in organisms" :key="organism.id">
      {{ organism.name }}
      <span v-if="organism.category">
        Catégorie: {{ organism.category.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { OrganismModule } from '@/store/Organism/OrganismModule'

@Component
export default class DisplayOrganisCategories extends Vue {
  public organismModule: OrganismModule = getModule(OrganismModule)

  get organisms() {
    return this.organismModule.allOrganisms
  }
}
</script>
