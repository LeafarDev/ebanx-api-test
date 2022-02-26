import { Inject, Service } from "typedi";
import { AccountRepository } from "../repositories/AccountRepository";
import { Response } from "express";

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
}
