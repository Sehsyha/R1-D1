<template>
  <div>
    <div>
      <h1>Catégories de document</h1>

      <h2>Création</h2>
      <CreateDocumentCategory />

      <h2>Tous</h2>
      <DisplayDocumentCategories />
    </div>

    <div>
      <h1>Documents</h1>

      <h2>Création</h2>
      <CreateDocument />

      <h2>Tous</h2>
      <DisplayDocuments />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import CreateDocument from '@/documents/ui/components/CreateDocument.vue'
import CreateDocumentCategory from '@/documents/ui/components/CreateDocumentCategory.vue'
import DisplayDocumentCategories from '@/documents/ui/components/DisplayDocumentCategories.vue'
import DisplayDocuments from '@/documents/ui/components/DisplayDocuments.vue'

@Component({
  components: {
    CreateDocument,
    CreateDocumentCategory,
    DisplayDocumentCategories,
    DisplayDocuments
  }
})
export default class Document extends Vue {}
</script>
