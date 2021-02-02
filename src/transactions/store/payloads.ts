export interface CreateTransactionPayload {
  amount: number;
  organismId: string;
  note?: string;
  documentId?: string;
}
