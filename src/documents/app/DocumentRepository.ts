import { Document } from '../entities/Document'

export interface DocumentRepository {
  create(document: Document): Promise<void>;
  findByReference(reference: string): Promise<Document | null>;
}
