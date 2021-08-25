import { DebtorDataInterface } from "./debtorData.interface";

export interface CreateDebtorInterface{

    cliendId: number,
    total: number,
    current: number,
    debtordata: DebtorDataInterface[]

}