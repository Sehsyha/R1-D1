<template>
  <div>
    <div v-for="document in documents" :key="document.id">
      Référence: {{ document.reference }},
      Catégorie: {{ document.category.name }},
      Organisme: {{ document.organism.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { Document } from '@/documents/entities/Document'
import { DocumentModule } from '@/documents/store/DocumentModule'

@Component
export default class DisplayDocuments extends Vue {
  documentModule = getModule(DocumentModule)

  get documents(): Document[] {
    return this.documentModule.all
  }
}
</script>
