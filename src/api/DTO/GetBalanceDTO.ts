import { IGetBalance } from "./types/IGetBalance";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class GetBalanceDTO implements IGetBalance {
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true })
  readonly accountId: string;

  constructor(accountId: string) {
    this.accountId = accountId;
  }
}
