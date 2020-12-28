import { DocumentCategory } from '../domain/DocumentCategory'

export interface DocumentCategoryRepository {
  findById(id: string): Promise<DocumentCategory | null>;
}
