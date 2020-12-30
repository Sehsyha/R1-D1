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
      <h1>Documents </h1>
      <h2>Création</h2>
      <CreateDocument />
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

import CreateDocumentCategory from '@/documents/ui/CreateDocumentCategory.vue'
import CreateDocument from '@/documents/ui/CreateDocument.vue'
import DisplayDocumentCategories from '@/documents/ui/DisplayDocumentCategories.vue'
import { DocumentCategoryModule } from '@/documents/store/DocumentCategoryModule'

import CreateOrganism from '@/organisms/ui/CreateOrganism.vue'
import DisplayOrganisms from '@/organisms/ui/DisplayOrganisms.vue'
import CreateOrganismCategory from '@/organisms/ui/CreateOrganismCategory.vue'
import DisplayOrganismCategories from '@/organisms/ui/DisplayOrganismCategories.vue'
import { OrganismModule } from '@/organisms/store/OrganismModule'
import { OrganismCategoryModule } from '@/organisms/store/OrganismCategoryModule'
import { DocumentModule } from '@/documents/store/DocumentModule'

@Component({
  components: {
    CreateDocumentCategory,
    CreateDocument,
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
  public documentModule = getModule(DocumentModule)

  async created() {
    await this.organismModule.fetch()
    await this.organismCategoryModule.fetch()
    await this.documentCategoryModule.fetch()
    await this.documentModule.fetch()
  }
}
</script>
