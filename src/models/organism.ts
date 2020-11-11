import { OrganismCategory } from './organismCategory'

export interface Organism {
  id: string;
  name: string;
  category?: OrganismCategory;
}
