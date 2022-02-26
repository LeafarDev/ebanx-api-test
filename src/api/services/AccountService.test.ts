import { AccountRepository } from "../repositories/AccountRepository";
import { Defs } from "../../utils/Defs";
import { AccountService } from "./AccountService";
import { Container } from "typedi";
import { expressResponseMock } from "../../../test/__mocks__/Express";

describe("AccountService", () => {
  const service = Container.get(AccountService);
  const spyFindOne = jest.spyOn(AccountRepository.prototype, "findOne");

  beforeEach(() => {
    jest.clearAllMocks();
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
      expect(expressResponseMock.json).toBeCalledWith("OK");
    });
  });
});
