<template>
  <form @submit.prevent="createDocument">
    <input type="text" v-model="reference" placeholder="Référence"/>
    <select v-model="categoryId">
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <select v-model="organismId">
      <option
        v-for="organism in organisms"
        :key="organism.id"
        :value="organism.id"
      >
        {{ organism.name }}
      </option>
    </select>
    <input type="submit" value="Créer le document" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { DocumentModule } from '@/documents/store/DocumentModule'
import { DocumentCategoryModule } from '@/documents/store/DocumentCategoryModule'
import { DocumentCategory } from '../entities/DocumentCategory'
import { OrganismModule } from '@/organisms/store/OrganismModule'
import { Organism } from '@/organisms/entities/Organism'

@Component
export default class CreateDocument extends Vue {
  public organismModule: OrganismModule = getModule(OrganismModule)
  public documentModule: DocumentModule = getModule(DocumentModule)
  public documentCategoryModule: DocumentCategoryModule = getModule(DocumentCategoryModule)

  public reference = ''
  public categoryId = ''
  public organismId = ''

  get categories (): DocumentCategory[] {
    return this.documentCategoryModule.all
  }

  get organisms (): Organism[] {
    return this.organismModule.all
  }

  public createDocument() {
    if (this.reference && this.categoryId && this.organismId) {
      this.documentModule.create(this.reference, this.categoryId, this.organismId)
    }
  }
}
</script>
