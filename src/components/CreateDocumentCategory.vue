<template>
  <form @submit.prevent="createDocumentCategory">
    <input type="text" v-model="documentCategoryName" />
    <input type="submit" value="Créer la catégorie de document" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { DocumentCategoryModule } from '@/store/DocumentCategoryModule'

@Component
export default class CreateDocumentCategory extends Vue {
  public documentCategoryModule: DocumentCategoryModule = getModule(DocumentCategoryModule)

  public documentCategoryName = ''

  public createDocumentCategory() {
    if (this.documentCategoryName) {
      this.documentCategoryModule.create(this.documentCategoryName)
    }
  }
}
</script>
