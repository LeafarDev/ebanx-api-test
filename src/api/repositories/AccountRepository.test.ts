import { AccountRepository } from "./AccountRepository";
import { Defs } from "../../utils/Defs";

describe("AccountRepository", () => {
  const repository = new AccountRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findOne", () => {
    it("should find account correctly", () => {
      const accountId = "888";
      const balance = 50;

      Defs.accounts.push({
        id: accountId,
        balance
      });

      const account = repository.findOne(accountId);

      expect(account).toBeDefined();
      expect(account?.id).toStrictEqual(accountId);
      expect(account?.balance).toStrictEqual(balance);
    });
  });

  describe("create", () => {
    it("should create account correctly", () => {
      const newAccountId = "100";
      const newAccountBalance = 600;

      repository.create(newAccountId, newAccountBalance);
      const createdAccount = repository.findOne(newAccountId);

      expect(createdAccount).toBeDefined();
      expect(createdAccount?.id).toStrictEqual(newAccountId);
      expect(createdAccount?.balance).toStrictEqual(newAccountBalance);
    });
  });

  describe("update", () => {
    it("should update account correctly", () => {
      const accountId = "716";
      const balance = 50;
      const extraAmount = 300;
      const balanceExpected = balance + extraAmount;

      Defs.accounts.push({
        id: accountId,
        balance
      });

      repository.update(accountId, balanceExpected);

      const updatedAccount = repository.findOne(accountId);

      expect(updatedAccount).toBeDefined();
      expect(updatedAccount?.id).toStrictEqual(accountId);
      expect(updatedAccount?.balance).toStrictEqual(balanceExpected);
    });
  });

  describe("reset", () => {
    it("should reset accounts def correctly", () => {
      const accountId = "741";
      const balance = 500;

      Defs.accounts.push({
        id: accountId,
        balance
      });

      const accountBeforeReset = repository.findOne(accountId);
      expect(accountBeforeReset).toBeDefined();
      expect(accountBeforeReset?.id).toStrictEqual(accountId);

      repository.reset();

      const accountAfterReset = repository.findOne(accountId);

      expect(accountAfterReset).toBeUndefined();
    });
  });
});
