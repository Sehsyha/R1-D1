import store from '.'
import { getOrganisms } from '@/db/organism'
import { Organism } from '@/models/organism'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ dynamic: true, store, name: 'organisation' })
export class OrganismModule extends VuexModule {
  organisms: Organism[] = []

  get all() {
    return this.organisms
  }

  @Mutation
  public setOrganisms(organisms: Organism[]) {
    this.organisms = organisms
  }

  @Action({ commit: 'setOrganisms' })
  public async fetchOrganisms(): Promise<Array<Organism>> {
    return getOrganisms()
  }
}
