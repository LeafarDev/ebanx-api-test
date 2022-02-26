import {
  JsonController,
  Get,
  Res,
  QueryParams,
  Post
} from "routing-controllers";
import { Container } from "typedi";
import { AccountService } from "../services/AccountService";
import { Response } from "express";
import { GetBalanceDTO } from "../DTO/GetBalanceDTO";

@JsonController()
export class AccountController {
  private readonly accountService: AccountService;

  constructor() {
    this.accountService = Container.get(AccountService);
  }

  @Get("/balance")
  getBalance(@QueryParams() query: GetBalanceDTO, @Res() resp: Response) {
    return this.accountService.getBalance(query.account_id, resp);
  }

  @Post("/reset")
  reset(@Res() resp: Response) {
    return this.accountService.reset(resp);
  }
}
