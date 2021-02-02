<template>
  <div>
    <h1>Transactions</h1>
    <CreateTransaction />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import CreateTransaction from '@/transactions/ui/components/CreateTransaction.vue'

@Component({
  components: {
    CreateTransaction
  }
})
export default class Transaction extends Vue {}
</script>
