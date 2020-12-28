export class DocumentCategory {
  private id: string
  private name: string

  public constructor(id: string, name: string) {
    if (id === '') {
      throw new Error("L'id de la catégorie de document n'est pas renseigné")
    }

    if (name === '') {
      throw new Error("Le nom de la catégorie de document n'est pas renseigné")
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
