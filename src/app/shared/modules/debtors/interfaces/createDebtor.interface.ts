import { DebtorDataInterface } from "./debtorData.interface";

export interface CreateDebtorInterface{

    clientId: number,
    total: number,
    current: number,
    debtordata: DebtorDataInterface[]

}