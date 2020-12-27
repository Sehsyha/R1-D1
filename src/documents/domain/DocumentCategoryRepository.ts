import { DocumentCategory } from './DocumentCategory'

export interface DocumentCategoryRepository {
  findById(id: string): Promise<DocumentCategory | null>;
}
