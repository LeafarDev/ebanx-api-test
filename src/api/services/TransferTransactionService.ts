import { Inject, Service } from "typedi";
import { ITransactionService } from "./types/ITransactionService";
import { AccountRepository } from "../repositories/AccountRepository";
import { ITransactionDTO } from "../DTO/types/ITransactionDTO";
import { Response } from "express";
import { AccountService } from "./AccountService";

@Service()
export class TransferTransactionService implements ITransactionService {
  constructor(
    @Inject() private accountRepository: AccountRepository,
    @Inject() private accountService: AccountService
  ) {}

  execute(transaction: ITransactionDTO, resp: Response) {
    const { origin, destination, amount } = transaction;

    if (!origin || !destination) {
      return resp
        .status(403)
        .json(
          "Account origin and destination needed in this type of transaction"
        );
    }

    const originAccount = this.accountRepository.findOne(origin);
    const destinationAccount = this.accountRepository.findOne(destination);

    if (!originAccount || !destinationAccount) {
      return resp.status(404).json(0);
    }

    const updatedOriginAccount = this.accountService.decreaseBalance(
      origin,
      amount
    );
    const updatedDestinationAccount = this.accountService.increaseBalance(
      destination,
      amount
    );

    return resp.status(201).json({
      origin: updatedOriginAccount,
      destination: updatedDestinationAccount
    });
  }
}
