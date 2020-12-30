<template>
  <div>
    <div v-for="organism in organisms" :key="organism.id">
      {{ organism.name }}
      Catégorie: {{ organism.category.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { OrganismModule } from '@/organisms/store/OrganismModule'

@Component
export default class DisplayOrganisms extends Vue {
  organismModule = getModule(OrganismModule)

  get organisms() {
    return this.organismModule.all
  }
}
</script>
