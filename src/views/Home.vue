<template>
  <div class="home">
    <form @submit.prevent="createCategory">
      <input type="text" v-model="categoryName" />
      <input type="submit" value="Créer la catégorie" />
    </form>

    <form @submit.prevent="createOrganism">
      <input type="text" v-model="organismName" />
      <select v-model="organismCategoryId">
        <option value="">
          Pas de catégorie
        </option>
        <option v-for="category in categories" :key="category._id" :value="category._id">
          {{ category.name }}
        </option>
      </select>
      <input type="submit" value="Créer l'organisme" />
    </form>

    <div v-for="organism in organisms" :key="organism.id">
      {{ organism.name }}
      <span v-if="organism.category">
        {{ organism.category.name }}
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
import { CreateOrganismPayload } from '@/store/Organism/payloads'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public organismModule = getModule(OrganismModule)
  public organismCategoryModule = getModule(OrganismCategoryModule)
  public categoryName = ''
  public organismName = ''
  public organismCategoryId = ''

  async created() {
    await this.organismModule.init()
    await this.organismCategoryModule.init()
  }

  get organisms() {
    return this.organismModule.allOrganisms
  }

  get categories() {
    return this.organismCategoryModule.allCategories
  }

  public createCategory() {
    if (this.categoryName) {
      this.organismCategoryModule.createCategory(this.categoryName)
    }
  }

  public createOrganism() {
    if (this.organismName) {
      const categoryId = this.organismCategoryId ? this.organismCategoryId : undefined
      const payload: CreateOrganismPayload = {
        name: this.organismName,
        categoryId
      }

      this.organismModule.createOrganism(payload)
    }
  }
}
</script>
