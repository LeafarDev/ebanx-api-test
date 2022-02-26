import { Body, JsonController, Post, Res } from "routing-controllers";
import { Container } from "typedi";
import { NewTransactionDTO } from "../DTO/NewTransactionDTO";
import { TransactionEventService } from "../services/TransactionEventService";
import { Response } from "express";

@JsonController()
export class TransactionController {
  private readonly transactionService: TransactionEventService;

  constructor() {
    this.transactionService = Container.get(TransactionEventService);
  }

  @Post("/event")
  create(@Body() body: NewTransactionDTO, @Res() resp: Response) {
    return this.transactionService.execute(body, resp);
  }
}
