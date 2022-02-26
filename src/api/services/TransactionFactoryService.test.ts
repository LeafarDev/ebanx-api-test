import { Container } from "typedi";
import { TransactionFactoryService } from "./TransactionFactoryService";
import { WithdrawTransactionService } from "./WithdrawTransactionService";
import { TransactionType } from "../DTO/types/TransactionType";
import { TransferTransactionService } from "./TransferTransactionService";
import { DepositTransactionService } from "./DepositTransactionService";
import { HttpError } from "routing-controllers";

describe("TransactionFactoryService", () => {
  const service = Container.get(TransactionFactoryService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("execute", () => {
    it("should return correctly instance", () => {
      const resultWithdraw = service.execute(TransactionType.withdraw);
      expect(resultWithdraw).toBeInstanceOf(WithdrawTransactionService);

      const resultTransfer = service.execute(TransactionType.transfer);
      expect(resultTransfer).toBeInstanceOf(TransferTransactionService);

      const resultDeposit = service.execute(TransactionType.deposit);
      expect(resultDeposit).toBeInstanceOf(DepositTransactionService);
    });

    it("should fail when transaction does not exist", () => {
      const transaction = "incorrect-transaction" as TransactionType;
      expect(() => service.execute(transaction)).toThrowError(HttpError);
    });
  });
});
