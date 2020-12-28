import { OrganismCategory } from '@/organisms/domain/organismCategory'

export class Organism {
  private id: string
  private name: string
  private category: OrganismCategory

  constructor(
    id: string,
    name: string,
    category: OrganismCategory | null
  ) {
    if (id === '') {
      throw new Error("L'identifiant de l'organisme n'est pas renseigné")
    }

    if (name === '') {
      throw new Error("Le nom de l'organisme n'est pas renseigné")
    }

    if (!category) {
      throw new Error("La catégorie de l'organisme n'est pas renseignée")
    }

    this.id = id
    this.name = name
    this.category = category
  }
}
