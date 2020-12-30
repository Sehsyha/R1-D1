<template>
  <form @submit.prevent="createDocumentCategory">
    <input type="text" v-model="name" placeholder="Nom"/>
    <input type="submit" value="Créer la catégorie de document" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { DocumentCategoryModule } from '@/documents/store/DocumentCategoryModule'

@Component
export default class CreateDocumentCategory extends Vue {
  public documentCategoryModule: DocumentCategoryModule = getModule(DocumentCategoryModule)

  public name = ''

  public createDocumentCategory() {
    if (this.name) {
      this.documentCategoryModule.create(this.name)
    }
  }
}
</script>
