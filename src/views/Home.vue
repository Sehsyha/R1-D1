<template>
  <div class="home">
    <div v-for="organism in organisms" :key="organism.id">
      {{ organism._id }} {{ organism.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import { OrganismModule } from '@/store/OrganismModule'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public organismModule = getModule(OrganismModule)

  mounted() {
    this.organismModule.fetchOrganisms()
  }

  get organisms() {
    return this.organismModule.all
  }
}
</script>
