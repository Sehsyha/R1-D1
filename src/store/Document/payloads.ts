export interface CreateDocumentPayload {
  name: string;
  reference: string;

  amount?: number;
  deadline?: string;
  link?: string;

  categoryId: string;
  organismId: string;
}
