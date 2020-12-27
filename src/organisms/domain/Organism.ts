import { OrganismCategory } from '@/organisms/domain/organismCategory'

export class Organism {
  private name: string
  private category: OrganismCategory

  constructor(
    name: string,
    category: OrganismCategory | null
  ) {
    if (name === '') {
      throw new Error("Le nom de l'organisme n'est pas renseigné")
    }

    if (!category) {
      throw new Error("La catégorie de l'organisme n'est pas renseignée")
    }

    this.name = name
    this.category = category
  }
}
