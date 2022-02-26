import { Inject, Service } from "typedi";
import { AccountRepository } from "../repositories/AccountRepository";
import { Response } from "express";
import { HttpError } from "routing-controllers";

@Service()
export class AccountService {
  constructor(@Inject() private accountRepository: AccountRepository) {}

  getBalance(accountId: string, resp: Response): Response {
    if (!accountId) {
      return resp
        .status(403)
        .json("accountId needed in this type of transaction");
    }

    const account = this.accountRepository.findOne(accountId);

    if (!account) {
      return resp.status(404).json(0);
    }

    return resp.status(200).json(account.balance);
  }

  reset(resp: Response): Response {
    this.accountRepository.reset();
    return resp.status(200).json("OK");
  }

  increaseBalance(accountId: string, amount: number) {
    const account = this.accountRepository.findOne(accountId);

    if (!account) {
      throw new HttpError(403, "Account does not exist");
    }

    const newBalance = account.balance + amount;

    return this.accountRepository.update(accountId, newBalance);
  }

  decreaseBalance(accountId: string, amount: number) {
    const account = this.accountRepository.findOne(accountId);

    if (!account) {
      throw new HttpError(403, "Account does not exist");
    }

    const newBalance = account.balance - amount;

    if (newBalance < 0) {
      throw new HttpError(403, "Insufficient funds");
    }

    return this.accountRepository.update(accountId, newBalance);
  }
}
