import { IAccount } from "./types/IAccount";

export class IAccountDTO implements IAccount {
  readonly balance: number;
  readonly id: string;

  constructor(balance: number, id: string) {
    this.balance = balance;
    this.id = id;
  }
}
