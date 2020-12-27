export class DocumentCategory {
  private name: string

  public constructor(name: string) {
    if (name === '') {
      throw new Error("Le nom de la catégorie de document n'est pas renseigné")
    }

    this.name = name
  }
}
