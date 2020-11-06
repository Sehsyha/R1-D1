import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { config } from 'vuex-module-decorators'

Vue.use(Vuex)

const store: StoreOptions<{}> = {
  strict: process.env.NODE_ENV === 'production'
}

config.rawError = true

export default new Vuex.Store<{}>(store)
