import { TransactionController } from "./TransactionController";
import { NewTransactionDTO } from "../DTO/NewTransactionDTO";
import { TransactionType } from "../DTO/types/TransactionType";
import { expressResponseMock } from "../../../test/__mocks__/Express";
import { TransactionEventService } from "../services/TransactionEventService";

describe("AccountController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const controller = new TransactionController();
  const spyTransactionServiceCreate = jest.spyOn(
    TransactionEventService.prototype,
    "execute"
  );

  describe("create", () => {
    it("should call TransactionEventService correctly", () => {
      const transaction = new NewTransactionDTO(
        TransactionType.deposit,
        100,
        null!,
        "123"
      );

      controller.create(transaction, expressResponseMock);
      expect(spyTransactionServiceCreate).toBeCalledWith(
        transaction,
        expressResponseMock
      );
    });
  });
});
