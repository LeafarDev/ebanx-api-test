import {
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsNumberString
} from "class-validator";
import { TransactionType } from "./types/TransactionType";
import { ITransactionDTO } from "./types/ITransactionDTO";

export class NewTransactionDTO implements ITransactionDTO {
  @IsNotEmpty()
  @IsEnum(TransactionType)
  readonly type: TransactionType;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 4 })
  readonly amount: number;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  readonly origin: string;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  readonly destination: string;

  constructor(
    type: TransactionType,
    amount: number,
    origin: string,
    destination: string
  ) {
    this.type = type;
    this.amount = amount;
    this.origin = origin;
    this.destination = destination;
  }
}
