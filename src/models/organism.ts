import { OrganismCategory } from './organismCategory'

export interface Organism {
  _id?: string;
  name: string;
  category?: OrganismCategory;
}
