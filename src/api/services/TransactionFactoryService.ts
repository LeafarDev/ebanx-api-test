import { Container, Service } from "typedi";
import { WithdrawTransactionService } from "./WithdrawTransactionService";
import { ITransactionFactoryService } from "./types/ITransactionService";
import { TransactionType } from "../DTO/types/TransactionType";
import { DepositTransactionService } from "./DepositTransactionService";
import { HttpError } from "routing-controllers";
import { TransferTransactionService } from "./TransferTransactionService";

@Service()
export class TransactionFactoryService implements ITransactionFactoryService {
  execute(type: TransactionType) {
    switch (type) {
    case TransactionType.withdraw:
      return Container.get(WithdrawTransactionService);
    case TransactionType.deposit:
      return Container.get(DepositTransactionService);
    case TransactionType.transfer:
      return Container.get(TransferTransactionService);
    default:
      throw new HttpError(403, "Operation not allowed");
    }
  }
}
