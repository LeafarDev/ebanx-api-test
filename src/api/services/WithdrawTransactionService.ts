import { AccountRepository } from "../repositories/AccountRepository";
import { Inject, Service } from "typedi";
import { ITransactionService } from "./types/ITransactionService";
import { ITransactionDTO } from "../DTO/types/ITransactionDTO";
import { Response } from "express";
import { AccountService } from "./AccountService";

@Service()
export class WithdrawTransactionService implements ITransactionService {
  constructor(
    @Inject() private accountRepository: AccountRepository,
    @Inject() private accountService: AccountService
  ) {}

  execute(transaction: ITransactionDTO, resp: Response) {
    const { origin, amount } = transaction;
    if (!origin) {
      return resp
        .status(403)
        .json("Account origin needed in this type of transaction");
    }

    const account = this.accountRepository.findOne(origin);

    if (!account) {
      return resp.status(404).json(0);
    }

    const updatedAccount = this.accountService.decreaseBalance(origin, amount);
    return resp.status(201).json({ origin: updatedAccount });
  }
}
