import { DocumentRepository } from '../app/DocumentRepository'
import { Document } from '../entities/Document'

export class DocumentInMemoryRepository implements DocumentRepository {
  private documents: Document[] = []

  public async create(document: Document): Promise<void> {
    this.documents.push(document)
  }

  public async findAll(): Promise<Document[]> {
    return this.documents
  }

  public async findById(id: string): Promise<Document | null> {
    return this.documents.find(document => document.getId() === id) ?? null
  }

  public async findByReference(reference: string): Promise<Document | null> {
    return this.documents.find(document => document.getReference() === reference) ?? null
  }
}
