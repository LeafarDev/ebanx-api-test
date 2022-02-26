import { TransactionType } from "./TransactionType";

export interface ITransactionDTO {
  readonly type: TransactionType;
  readonly origin: string;
  readonly destination: string;
  readonly amount: number;
}
