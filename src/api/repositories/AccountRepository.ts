import { Service } from "typedi";
import { IAccountDTO } from "../DTO/IAccountDTO";
import { Defs } from "../../utils/Defs";

@Service()
export class AccountRepository {
  findOne(id: string): IAccountDTO | undefined {
    return Defs.accounts.find((account) => account.id === id);
  }

  create(accountId: string, balance: number) {
    const newAccount = {
      id: accountId,
      balance: balance
    };

    Defs.accounts.push(newAccount);

    return newAccount;
  }

  update(accountId: string, balance: number): IAccountDTO {
    const accounts = Defs.accounts.filter(
      (account) => account.id !== accountId
    );

    const updatedAccount = {
      id: accountId,
      balance: balance
    };

    accounts.push(updatedAccount);
    Defs.accounts = accounts;

    return updatedAccount;
  }

  reset() {
    Defs.accounts = [
      {
        id: "300",
        balance: 0
      },
      {
        id: "200",
        balance: 10
      }
    ];
  }
}
