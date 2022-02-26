import { IGetBalance } from "./types/IGetBalance";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class GetBalanceDTO implements IGetBalance {
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true })
  readonly account_id: string;

  constructor(accountId: string) {
    this.account_id = accountId;
  }
}
