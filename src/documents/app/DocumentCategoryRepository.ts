import { DocumentCategory } from '../entities/DocumentCategory'

export interface DocumentCategoryRepository {
  create(documentCategory: DocumentCategory): Promise<void>;
  getAll(): Promise<DocumentCategory[]>;
  findById(id: string): Promise<DocumentCategory | null>;
  findByName(name: string): Promise<DocumentCategory | null>;
}
