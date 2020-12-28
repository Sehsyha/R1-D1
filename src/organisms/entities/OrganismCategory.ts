export class OrganismCategory {
  private id: string
  private name: string

  constructor(id: string, name: string) {
    if (id === '') {
      throw new Error("L'id de la catégorie d'organisme n'est pas renseigné")
    }

    if (name === '') {
      throw new Error("Le nom de la catégorie d'organisme n'est pas renseigné")
    }

    this.id = id
    this.name = name
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }
}
