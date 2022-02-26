import { Container } from "typedi";
import { DepositTransactionService } from "./DepositTransactionService";
import { NewTransactionDTO } from "../DTO/NewTransactionDTO";
import { TransactionType } from "../DTO/types/TransactionType";
import { expressResponseMock } from "../../../test/__mocks__/Express";
import { Defs } from "../../utils/Defs";
import { AccountRepository } from "../repositories/AccountRepository";
import { AccountService } from "./AccountService";

describe("DepositTransactionService", () => {
  const service = Container.get(DepositTransactionService);
  const spyFindOne = jest.spyOn(AccountRepository.prototype, "findOne");
  const spyCreate = jest.spyOn(AccountRepository.prototype, "create");

  const spyIncreaseBalance = jest.spyOn(
    AccountService.prototype,
    "increaseBalance"
  );

  beforeEach(() => {
    jest.clearAllMocks();
    Defs.accounts = [];
  });

  describe("execute", () => {
    it("should deposit correctly in a existent account transaction", () => {
      const accountId = "888";
      const balance = 50;
      const depositAmount = 100;
      const expectedBalance = balance + depositAmount;

      Defs.accounts.push({
        id: accountId,
        balance
      });

      const transaction = new NewTransactionDTO(
        TransactionType.deposit,
        depositAmount,
        null!,
        accountId
      );

      service.execute(transaction, expressResponseMock);

      expect(spyFindOne).toBeCalledWith(accountId);
      expect(spyIncreaseBalance).toBeCalledWith(accountId, depositAmount);
      expect(spyCreate).toBeCalledTimes(0);
      expect(expressResponseMock.status).toBeCalledWith(201);
      expect(expressResponseMock.json).toBeCalledWith({
        destination: {
          id: accountId,
          balance: expectedBalance
        }
      });
    });

    it("should create a new account when does not exist", () => {
      const accountId = "742";
      const depositAmount = 100;

      const transaction = new NewTransactionDTO(
        TransactionType.deposit,
        depositAmount,
        null!,
        accountId
      );

      service.execute(transaction, expressResponseMock);

      expect(spyFindOne).toBeCalledWith(accountId);
      expect(spyCreate).toBeCalledWith(accountId, depositAmount);
      expect(expressResponseMock.json).toBeCalledWith({
        destination: {
          id: accountId,
          balance: depositAmount
        }
      });
    });

    it("should fail when there is no destination account", () => {
      const depositAmount = 100;

      const transaction = new NewTransactionDTO(
        TransactionType.deposit,
        depositAmount,
        null!,
        null!
      );

      service.execute(transaction, expressResponseMock);

      expect(expressResponseMock.status).toBeCalledWith(403);
      expect(expressResponseMock.json).toBeCalledWith(
        "Account destination needed in this type of transaction"
      );
      expect(spyFindOne).toBeCalledTimes(0);
      expect(spyIncreaseBalance).toBeCalledTimes(0);
      expect(spyCreate).toBeCalledTimes(0);
    });
  });
});
