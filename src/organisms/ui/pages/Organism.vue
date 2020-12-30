<template>
  <div>
    <div>
      <h1>Catégorie d'organisme</h1>

      <h2>Création</h2>
      <CreateOrganismCategory />

      <h2>Tous</h2>
      <DisplayOrganismCategories />
    </div>

    <div>
      <h1>Organisme</h1>
      <h2>Création</h2>
      <CreateOrganism />

      <h2>Tous</h2>
      <DisplayOrganisms />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import CreateOrganism from '@/organisms/ui/components/CreateOrganism.vue'
import CreateOrganismCategory from '@/organisms/ui/components/CreateOrganismCategory.vue'
import DisplayOrganismCategories from '@/organisms/ui/components/DisplayOrganismCategories.vue'
import DisplayOrganisms from '@/organisms/ui/components/DisplayOrganisms.vue'

@Component({
  components: {
    CreateOrganism,
    CreateOrganismCategory,
    DisplayOrganismCategories,
    DisplayOrganisms
  }
})
export default class Organism extends Vue {}
</script>
