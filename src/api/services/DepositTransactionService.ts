import { Inject, Service } from "typedi";
import { ITransactionService } from "./types/ITransactionService";
import { AccountRepository } from "../repositories/AccountRepository";
import { ITransactionDTO } from "../DTO/types/ITransactionDTO";
import { Response } from "express";
import { AccountService } from "./AccountService";

@Service()
export class DepositTransactionService implements ITransactionService {
  constructor(
    @Inject() private accountRepository: AccountRepository,
    @Inject() private accountService: AccountService
  ) {}

  execute(transaction: ITransactionDTO, resp: Response) {
    const { destination, amount } = transaction;

    if (!destination) {
      return resp
        .status(403)
        .json("Account destination needed in this type of transaction");
    }

    const account = this.accountRepository.findOne(destination);

    if (!account) {
      const createdAccount = this.accountRepository.create(destination, amount);
      return resp.status(201).json({ destination: createdAccount });
    }

    const updatedAccount = this.accountService.increaseBalance(
      destination,
      amount
    );

    return resp.status(201).json({ destination: updatedAccount });
  }
}
