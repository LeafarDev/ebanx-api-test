import { ITransactionDTO } from "../../DTO/types/ITransactionDTO";
import { TransactionType } from "../../DTO/types/TransactionType";
import { Response } from "express";

export interface ITransactionService {
  execute(type: ITransactionDTO, resp: Response): Response;
}

export interface ITransactionFactoryService {
  execute(type: TransactionType): ITransactionService;
}
