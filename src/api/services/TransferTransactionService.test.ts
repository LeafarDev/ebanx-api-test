import { Container } from "typedi";
import { AccountRepository } from "../repositories/AccountRepository";
import { AccountService } from "./AccountService";
import { TransferTransactionService } from "./TransferTransactionService";
import { Defs } from "../../utils/Defs";
import { AccountDTO } from "../DTO/AccountDTO";
import { NewTransactionDTO } from "../DTO/NewTransactionDTO";
import { TransactionType } from "../DTO/types/TransactionType";
import { expressResponseMock } from "../../../test/__mocks__/Express";

describe("TransferTransactionService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Defs.accounts = [];
  });

  const service = Container.get(TransferTransactionService);
  const spyFindOne = jest.spyOn(AccountRepository.prototype, "findOne");
  const spyIncreaseBalance = jest.spyOn(
    AccountService.prototype,
    "increaseBalance"
  );

  const spyDecreaseBalance = jest.spyOn(
    AccountService.prototype,
    "decreaseBalance"
  );

  describe("execute", () => {
    it("should transfer correctly", () => {
      const transferAmount = 50;
      const originAccount = new AccountDTO("50", 60);
      const destinationAccount = new AccountDTO("0", 0);

      Defs.accounts.push(originAccount, destinationAccount);

      const transaction = new NewTransactionDTO(
        TransactionType.transfer,
        transferAmount,
        originAccount.id,
        destinationAccount.id
      );

      service.execute(transaction, expressResponseMock);

      expect(spyFindOne).toBeCalledWith(originAccount.id);
      expect(spyFindOne).toBeCalledWith(destinationAccount.id);
      expect(spyIncreaseBalance).toBeCalledWith(
        destinationAccount.id,
        transferAmount
      );
      expect(spyDecreaseBalance).toBeCalledWith(
        originAccount.id,
        transferAmount
      );
      expect(expressResponseMock.status).toBeCalledWith(201);
      expect(expressResponseMock.json).toBeCalledWith({
        origin: {
          id: originAccount.id,
          balance: 10
        },
        destination: {
          id: destinationAccount.id,
          balance: transferAmount
        }
      });
    });

    it("should fail when there is no destination account", () => {
      const depositAmount = 100;

      const transaction = new NewTransactionDTO(
        TransactionType.transfer,
        depositAmount,
        null!,
        null!
      );

      service.execute(transaction, expressResponseMock);

      expect(expressResponseMock.status).toBeCalledWith(403);
      expect(expressResponseMock.json).toBeCalledWith(
        "Account origin and destination needed in this type of transaction"
      );
      expect(spyFindOne).toBeCalledTimes(0);
      expect(spyIncreaseBalance).toBeCalledTimes(0);
      expect(spyDecreaseBalance).toBeCalledTimes(0);
    });
  });
});
