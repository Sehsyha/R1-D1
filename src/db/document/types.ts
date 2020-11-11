export interface DocumentEntity {
  _id?: string;

  name: string;
  reference: string;

  amount?: number;
  deadline?: string;
  link?: string;

  categoryId: string;
  organismId: string;
}
