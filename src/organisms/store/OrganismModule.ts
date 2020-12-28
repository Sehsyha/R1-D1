import store from '@/common/store'
import { Organism } from '@/organisms/entities/Organism'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { CreateOrganismPayload } from './payloads'
import { ServiceFactory } from '@/common/factories/ServiceFactory'

@Module({ dynamic: true, store, name: 'organism', namespaced: true })
export class OrganismModule extends VuexModule {
  private organisms: Organism[] = []

  get all() {
    return this.organisms
  }

  @Mutation
  public set(organisms: Organism[]) {
    this.organisms = organisms
  }

  @Mutation
  public add(organism: Organism) {
    this.organisms = [...this.organisms, organism]
  }

  @Action({ commit: 'set' })
  public async fetch(): Promise<Organism[]> {
    return ServiceFactory.getOrganismService().getAll()
  }

  @Action({ commit: 'add' })
  public async create({ name, categoryId }: CreateOrganismPayload): Promise<Organism> {
    return ServiceFactory.getOrganismService().createOrganism(name, categoryId)
  }
}
