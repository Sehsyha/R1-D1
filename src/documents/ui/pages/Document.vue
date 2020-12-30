<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import CreateDocument from '@/documents/ui/components/CreateDocument.vue'
import CreateDocumentCategory from '@/documents/ui/components/CreateDocumentCategory.vue'
import DisplayDocumentCategories from '@/documents/ui/components/DisplayDocumentCategories.vue'

@Component({
  components: {
    CreateDocument,
    CreateDocumentCategory,
    DisplayDocumentCategories
  }
})
export default class Document extends Vue {

}
</script>
