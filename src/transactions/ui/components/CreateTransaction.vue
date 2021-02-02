<template>
  <form @submit.prevent="createTransaction">
    <input type="number" v-model="amount" placeholder="montant" />
    <select v-model="organismId">
      <option
        v-for="organism in organisms"
        :key="organism.id"
        :value="organism.id"
      >
        {{ organism.name }}
      </option>
    </select>

    <input type="text" v-model="note" placeholder="Note" />
    <select v-model="documentId">
      <option value="">
        Pas de document
      </option>
      <option
        v-for="document in filteredDocuments"
        :key="document.id"
        :value="document.id"
      >
        {{ document.reference }}
      </option>
    </select>

    {{ transactions}}

    <input type="submit" value="Créer la transaction" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import { TransactionModule } from '@/transactions/store/TransactionModule'
import { CreateTransactionPayload } from '@/transactions/store/payloads'
import { OrganismModule } from '@/organisms/store/OrganismModule'
import { DocumentModule } from '@/documents/store/DocumentModule'
import { Document } from '@/documents/entities/Document'

@Component
export default class CreateTransaction extends Vue {
  transactionModule = getModule(TransactionModule)
  organismModule = getModule(OrganismModule)
  documentModule = getModule(DocumentModule)
  amount = 0
  note = ''
  documentId = ''
  organismId = ''

  get organisms () {
    return this.organismModule.all
  }

  get transactions () {
    return this.transactionModule.all
  }

  get filteredDocuments (): Document[] {
    if (this.organismId === '') {
      return []
    }

    return this.documents.filter(document => document.getOrganismId() === this.organismId)
  }

  get documents () {
    return this.documentModule.all
  }

  async createTransaction () {
    if (this.amount && this.organismId) {
      const { amount, note, organismId, documentId } = this
      const payload: CreateTransactionPayload = {
        amount,
        organismId,
        note: note || undefined,
        documentId: documentId || undefined
      }

      await this.transactionModule.create(payload)

      this.amount = 0
      this.organismId = ''
      this.note = ''
      this.documentId = ''
    }
  }
}
</script>
