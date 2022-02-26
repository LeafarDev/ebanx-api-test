import { AccountRepository } from "../repositories/AccountRepository";
import { Defs } from "../../utils/Defs";
import { AccountService } from "./AccountService";
import { Container } from "typedi";
import { expressResponseMock } from "../../../test/__mocks__/Express";
import { HttpError } from "routing-controllers";

describe("AccountService", () => {
  const service = Container.get(AccountService);
  const spyFindOne = jest.spyOn(AccountRepository.prototype, "findOne");
  const spyUpdate = jest.spyOn(AccountRepository.prototype, "update");

  beforeEach(() => {
    jest.clearAllMocks();
    Defs.accounts = [];
  });

  describe("getBalance", () => {
    it("should get balance correctly", () => {
      const accountId = "123";
      const balance = 500;

      Defs.accounts.push({
        id: accountId,
        balance
      });

      service.getBalance(accountId, expressResponseMock);

      expect(spyFindOne).toBeCalledWith(accountId);
      expect(expressResponseMock.status).toBeCalledWith(200);
      expect(expressResponseMock.json).toBeCalledWith(balance);
    });

    it("should not allow empty account id", () => {
      service.getBalance(null!, expressResponseMock);

      expect(spyFindOne).toBeCalledTimes(0);
      expect(expressResponseMock.status).toBeCalledWith(403);
      expect(expressResponseMock.json).toBeCalledWith(
        "accountId needed in this type of transaction"
      );
    });

    it("should handle correctly when account does not exist", () => {
      service.getBalance("000", expressResponseMock);

      expect(spyFindOne).toBeCalledWith("000");
      expect(expressResponseMock.status).toBeCalledWith(404);
      expect(expressResponseMock.json).toBeCalledWith(0);
    });
  });

  describe("reset", () => {
    it("should call reset correctly", () => {
      const spyReset = jest.spyOn(AccountRepository.prototype, "reset");
      service.reset(expressResponseMock);

      expect(spyReset).toBeCalledTimes(1);
      expect(expressResponseMock.status).toBeCalledWith(200);
      expect(expressResponseMock.send).toBeCalledWith("OK");
    });
  });

  describe("increaseBalance", () => {
    it("should increase balance correctly", () => {
      const accountId = "963";
      const initialBalance = 500;
      const amountToIncrease = 200;
      const expectedNewBalance = initialBalance + amountToIncrease;

      Defs.accounts.push({
        id: accountId,
        balance: initialBalance
      });

      const result = service.increaseBalance(accountId, amountToIncrease);

      expect(spyFindOne).toBeCalledWith(accountId);
      expect(spyUpdate).toBeCalledWith(accountId, expectedNewBalance);
      expect(result.id).toStrictEqual(accountId);
      expect(result.balance).toStrictEqual(expectedNewBalance);
    });

    it("should fail when account does not exist", () => {
      const accountId = "000";

      expect(() => service.increaseBalance(accountId, 123)).toThrowError(
        HttpError
      );
      expect(spyFindOne).toBeCalledWith(accountId);
      expect(spyUpdate).toBeCalledTimes(0);
    });
  });

  describe("decreaseBalance", () => {
    it("should decrease balance correctly", () => {
      const accountId = "142";
      const initialBalance = 800;
      const amountToDecrease = 200;
      const expectedNewBalance = initialBalance - amountToDecrease;

      Defs.accounts.push({
        id: accountId,
        balance: initialBalance
      });

      const result = service.decreaseBalance(accountId, amountToDecrease);

      expect(spyFindOne).toBeCalledWith(accountId);
      expect(spyUpdate).toBeCalledWith(accountId, expectedNewBalance);
      expect(result.id).toStrictEqual(accountId);
      expect(result.balance).toStrictEqual(expectedNewBalance);
    });

    it("should fail when account does not exist", () => {
      const accountId = "000";

      expect(() => service.decreaseBalance(accountId, 123)).toThrowError(
        HttpError
      );
      expect(spyFindOne).toBeCalledWith(accountId);
      expect(spyUpdate).toBeCalledTimes(0);
    });

    it("should fail when account does not have sufficient funds", () => {
      const accountId = "144";
      const initialBalance = 10;
      const amountToDecrease = 200;

      Defs.accounts.push({
        id: accountId,
        balance: initialBalance
      });

      expect(() =>
        service.decreaseBalance(accountId, amountToDecrease)
      ).toThrowError(HttpError);
      expect(spyFindOne).toBeCalledWith(accountId);
      expect(spyUpdate).toBeCalledTimes(0);
    });
  });
});
