<template>
  <form @submit.prevent="createDocument">
    <input type="text" v-model="name" placeholder="Nom"/><br />
    <input type="text" v-model="reference" placeholder="Référence" /><br />
    <input type="number" v-model="amount" placeholder="Montant" /><br />
    <input type="text" v-model="deadline" placeholder="Date d'échéance" /><br />
    <input type="text" v-model="link" placeholder="Lien" /><br />
    <select v-model="categoryId">
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select><br />
    <select v-model="organismId">
      <option v-for="organism in organisms" :key="organism.id" :value="organism.id">
        {{ organism.name }}
      </option>
    </select><br />
    <input type="submit" value="Créer le document"/>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { DocumentCategoryModule } from '@/store/DocumentCategory/DocumentCategoryModule'
import { OrganismModule } from '@/store/Organism/OrganismModule'
import { DocumentModule } from '@/store/Document/DocumentModule'

@Component
export default class CreateDocument extends Vue {
  public name = ''
  public reference = ''
  public amount: number | null = null
  public deadline = ''
  public link = ''
  public categoryId = ''
  public organismId = ''
  public documentCategoryModule = getModule(DocumentCategoryModule)
  public organismModule = getModule(OrganismModule)
  public documentModule = getModule(DocumentModule)

  get categories() {
    return this.documentCategoryModule.all
  }

  get organisms() {
    return this.organismModule.all
  }

  public createDocument() {
    this.documentModule.create()
  }
}
</script>
