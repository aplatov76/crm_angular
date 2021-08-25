import {DebtorInterface} from '../../interfaces/debtor.interface';

export interface DebtorStateInterface {
    debtors: DebtorInterface[],
    currentDebtor: DebtorInterface,
    loading: boolean,
    error: string
}