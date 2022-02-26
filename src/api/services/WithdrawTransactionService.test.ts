import { Defs } from "../../utils/Defs";
import { NewTransactionDTO } from "../DTO/NewTransactionDTO";
import { TransactionType } from "../DTO/types/TransactionType";
import { expressResponseMock } from "../../../test/__mocks__/Express";
import { Container } from "typedi";
import { AccountRepository } from "../repositories/AccountRepository";
import { AccountService } from "./AccountService";
import { WithdrawTransactionService } from "./WithdrawTransactionService";

describe("WithdrawTransactionService", () => {
  const service = Container.get(WithdrawTransactionService);
  const spyFindOne = jest.spyOn(AccountRepository.prototype, "findOne");
  const spyCreate = jest.spyOn(AccountRepository.prototype, "create");

  const spyDecreaseBalance = jest.spyOn(
    AccountService.prototype,
    "decreaseBalance"
  );

  beforeEach(() => {
    jest.clearAllMocks();
    Defs.accounts = [];
  });

  describe("execute", () => {
    it("should withdraw correctly in a existent account transaction", () => {
      const accountId = "888";
      const balance = 50;
      const withdrawAmount = 40;
      const expectedBalance = balance - withdrawAmount;

      Defs.accounts.push({
        id: accountId,
        balance
      });

      const transaction = new NewTransactionDTO(
        TransactionType.withdraw,
        withdrawAmount,
        accountId,
        null!
      );

      service.execute(transaction, expressResponseMock);

      expect(spyFindOne).toBeCalledWith(accountId);
      expect(spyDecreaseBalance).toBeCalledWith(accountId, withdrawAmount);
      expect(spyCreate).toBeCalledTimes(0);
      expect(expressResponseMock.status).toBeCalledWith(201);
      expect(expressResponseMock.json).toBeCalledWith({
        origin: {
          id: accountId,
          balance: expectedBalance
        }
      });
    });

    it("should fail when there is no origin account", () => {
      const withdrawAmount = 100;

      const transaction = new NewTransactionDTO(
        TransactionType.withdraw,
        withdrawAmount,
        null!,
        null!
      );

      service.execute(transaction, expressResponseMock);

      expect(expressResponseMock.status).toBeCalledWith(403);
      expect(expressResponseMock.json).toBeCalledWith(
        "Account origin needed in this type of transaction"
      );
      expect(spyFindOne).toBeCalledTimes(0);
      expect(spyDecreaseBalance).toBeCalledTimes(0);
      expect(spyCreate).toBeCalledTimes(0);
    });
  });
});
