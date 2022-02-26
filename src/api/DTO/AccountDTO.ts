import { IAccountDTO } from "./types/IAccountDTO";

export class AccountDTO implements IAccountDTO {
  readonly balance: number;
  readonly id: string;

  constructor(id: string, balance: number) {
    this.id = id;
    this.balance = balance;
  }
}
