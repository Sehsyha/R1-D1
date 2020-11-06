<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { createOrganisation, getOrganisations } from '@/db/organisation'
import Component from 'vue-class-component'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  async mounted() {
    await createOrganisation('Willemse')
    const organisations = await getOrganisations()
    console.log(organisations)
  }
}
</script>
