import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { config } from 'vuex-module-decorators'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

const store: StoreOptions<{}> = {
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ]
}

config.rawError = true

export default new Vuex.Store<{}>(store)
