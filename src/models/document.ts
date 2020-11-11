import { DocumentCategory } from './documentCategory'
import { Organism } from './organism'

export interface Document {
  id: string;

  name: string;
  reference: string;

  amount?: number;
  deadline?: string;
  link?: string;

  category: DocumentCategory;
  organism: Organism;
}
