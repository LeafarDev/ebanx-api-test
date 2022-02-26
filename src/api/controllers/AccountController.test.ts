import { AccountController } from "./AccountController";
import { expressResponseMock } from "../../../test/__mocks__/Express";
import { GetBalanceDTO } from "../DTO/GetBalanceDTO";
import { AccountService } from "../services/AccountService";

describe("AccountController", () => {
  const controller = new AccountController();
  const spyGetBalance = jest.spyOn(AccountService.prototype, "getBalance");
  const spyReset = jest.spyOn(AccountService.prototype, "reset");

  describe("getBalance", () => {
    it("should call AccountService getBalance method correctly", () => {
      const balanceRequest = new GetBalanceDTO("123");

      controller.getBalance(balanceRequest, expressResponseMock);

      expect(spyGetBalance).toBeCalledWith(
        balanceRequest.accountId,
        expressResponseMock
      );
    });
  });
  describe("reset", () => {
    it("should call AccountService reset method correctly", () => {
      controller.reset(expressResponseMock);

      expect(spyReset).toBeCalledWith(expressResponseMock);
    });
  });
});
