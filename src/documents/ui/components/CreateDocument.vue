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
import { DocumentCategory } from '@/documents/entities/DocumentCategory'
import { OrganismModule } from '@/organisms/store/OrganismModule'
import { Organism } from '@/organisms/entities/Organism'
import { CreateDocumentPayload } from '@/documents/store/payloads'

@Component
export default class CreateDocument extends Vue {
  organismModule = getModule(OrganismModule)
  documentModule = getModule(DocumentModule)
  documentCategoryModule = getModule(DocumentCategoryModule)

  reference = ''
  categoryId = ''
  organismId = ''

  get categories (): DocumentCategory[] {
    return this.documentCategoryModule.all
  }

  get organisms (): Organism[] {
    return this.organismModule.all
  }

  createDocument() {
    if (this.reference && this.categoryId && this.organismId) {
      const { reference, categoryId, organismId } = this
      const payload: CreateDocumentPayload = {
        reference,
        categoryId,
        organismId
      }

      this.documentModule.create(payload)
    }
  }
}
</script>
