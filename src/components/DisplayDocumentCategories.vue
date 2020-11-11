<template>
  <ul>
    <li v-for="category in categories" :key="category.id">
      {{ category.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { DocumentCategoryModule } from '@/store/DocumentCategory/DocumentCategoryModule'

@Component
export default class DisplayDocumentCategories extends Vue {
  public documentCategoryModule: DocumentCategoryModule = getModule(DocumentCategoryModule)

  get categories() {
    return this.documentCategoryModule.all
  }
}
</script>
