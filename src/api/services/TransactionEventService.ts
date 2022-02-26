import { Inject, Service } from "typedi";
import logger from "node-color-log";
import { ITransactionDTO } from "../DTO/types/ITransactionDTO";
import { Response } from "express";
import { TransactionFactoryService } from "./TransactionFactoryService";
import { HttpError } from "routing-controllers";

@Service()
export class TransactionEventService {
  constructor(
    @Inject() private transactionFactoryService: TransactionFactoryService
  ) {}

  execute(transaction: ITransactionDTO, resp: Response) {
    try {
      const transactionService = this.transactionFactoryService.execute(
        transaction.type
      );

      if (transactionService) {
        return transactionService.execute(transaction, resp);
      }
    } catch (error) {
      logger.error(error);

      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(
        500,
        "Could not create the transaction, please try again later"
      );
    }
  }
}
