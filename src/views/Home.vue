<template>
  <div class="home">
    <h1>Catégorie de document</h1>
    <h2>Création</h2>
    <form @submit.prevent="createDocumentCategory">
      <input type="text" v-model="documentCategoryName" />
      <input type="submit" value="Créer la catégorie de document" />
    </form>
    <h2>Tous</h2>
    <ul>
      <li v-for="documentCategory in documentCategories" :key="documentCategory._id">
        {{ documentCategory.name }}
      </li>
    </ul>

    <h1>Catégorie d'organisme</h1>
    <h2>Création</h2>
    <form @submit.prevent="createOrganismCategory">
      <input type="text" v-model="organismCategoryName" />
      <input type="submit" value="Créer la catégorie d'organisme" />
    </form>
    <h2>Tous</h2>
    <ul>
      <li v-for="organismCategory in organismCategories" :key="organismCategory._id">
        {{ organismCategory.name }}
      </li>
    </ul>

    <h1>Organisme</h1>
    <h2>Création</h2>
    <form @submit.prevent="createOrganism">
      <input type="text" v-model="organismName" />
      <select v-model="organismCategoryId">
        <option value="">
          Pas de catégorie
        </option>
        <option v-for="category in organismCategories" :key="category._id" :value="category._id">
          {{ category.name }}
        </option>
      </select>
      <input type="submit" value="Créer l'organisme" />
    </form>

    <h2>Tous</h2>
    <div v-for="organism in organisms" :key="organism.id">
      {{ organism.name }}
      <span v-if="organism.category">
        Catégorie: {{ organism.category.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import { OrganismModule } from '@/store/Organism/OrganismModule'
import { OrganismCategoryModule } from '@/store/OrganismCategoryModule'
import { DocumentCategoryModule } from '@/store/DocumentCategoryModule'
import { CreateOrganismPayload } from '@/store/Organism/payloads'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public organismModule = getModule(OrganismModule)
  public organismCategoryModule = getModule(OrganismCategoryModule)
  public documentCategoryModule = getModule(DocumentCategoryModule)
  public organismCategoryName = ''
  public organismName = ''
  public organismCategoryId = ''
  public documentCategoryName = ''

  async created() {
    await this.organismModule.init()
    await this.organismCategoryModule.init()
    await this.documentCategoryModule.init()
  }

  get organisms() {
    return this.organismModule.allOrganisms
  }

  get organismCategories() {
    return this.organismCategoryModule.all
  }

  get documentCategories() {
    return this.documentCategoryModule.all
  }

  public createOrganismCategory() {
    if (this.organismCategoryName) {
      this.organismCategoryModule.create(this.organismCategoryName)
    }
  }

  public createDocumentCategory() {
    if (this.documentCategoryName) {
      this.documentCategoryModule.create(this.documentCategoryName)
    }
  }

  public createOrganism() {
    if (this.organismName) {
      const categoryId = this.organismCategoryId ? this.organismCategoryId : undefined
      const payload: CreateOrganismPayload = {
        name: this.organismName,
        categoryId
      }

      this.organismModule.create(payload)
    }
  }
}
</script>
