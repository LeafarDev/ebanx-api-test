import { TransactionFactoryService } from "./TransactionFactoryService";
import { TransactionEventService } from "./TransactionEventService";
import { Container } from "typedi";
import { Defs } from "../../utils/Defs";
import { NewTransactionDTO } from "../DTO/NewTransactionDTO";
import { TransactionType } from "../DTO/types/TransactionType";
import { expressResponseMock } from "../../../test/__mocks__/Express";
import { DepositTransactionService } from "./DepositTransactionService";

describe("TransactionEventService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Defs.accounts = [];
  });

  const service = Container.get(TransactionEventService);

  const spyTransactionFactory = jest.spyOn(
    TransactionFactoryService.prototype,
    "execute"
  );

  const spyDepositService = jest.spyOn(
    DepositTransactionService.prototype,
    "execute"
  );

  describe("execute", () => {
    it("should call the correct transaction through factory service", () => {
      const accountId = "888";
      const balance = 50;
      const depositAmount = 100;

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
      expect(spyTransactionFactory).toBeCalledWith(transaction.type);
      expect(spyDepositService).toBeCalledWith(
        transaction,
        expressResponseMock
      );
    });
  });
});
