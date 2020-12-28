<template>
  <div class="home">
    <div>
      <h1>Catégorie de document</h1>

      <h2>Création</h2>
      <CreateDocumentCategory />

      <h2>Tous</h2>
      <DisplayDocumentCategories />
    </div>

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
import { getModule } from 'vuex-module-decorators'

import CreateDocumentCategory from '@/components/CreateDocumentCategory.vue'
import DisplayDocumentCategories from '@/components/DisplayDocumentCategories.vue'
import CreateOrganism from '@/components/CreateOrganism.vue'
import DisplayOrganisms from '@/components/DisplayOrganisms.vue'
import CreateOrganismCategory from '@/components/CreateOrganismCategory.vue'
import DisplayOrganismCategories from '@/components/DisplayOrganismCategories.vue'

import { OrganismModule } from '@/organisms/store/OrganismModule'
import { OrganismCategoryModule } from '@/organisms/store/OrganismCategoryModule'
import { DocumentCategoryModule } from '@/documents/store/DocumentCategoryModule'

@Component({
  components: {
    CreateDocumentCategory,
    DisplayDocumentCategories,
    CreateOrganism,
    DisplayOrganisms,
    CreateOrganismCategory,
    DisplayOrganismCategories
  }
})
export default class Home extends Vue {
  public organismModule = getModule(OrganismModule)
  public organismCategoryModule = getModule(OrganismCategoryModule)
  public documentCategoryModule = getModule(DocumentCategoryModule)

  async created() {
    // await this.organismModule.fetch()
    // await this.organismCategoryModule.fetch()
    // await this.documentCategoryModule.fetch()
  }
}
</script>
