import {ClientInterface} from '../../../interfaces/client.interface'
import { DebtorDataInterface } from './debtorData.interface';
import { DebtorPayedInterface } from './debtorPayed.interface';

export interface DebtorInterface{
    id: number,
    client: ClientInterface,
    total: number,
    current: number,
    products: DebtorDataInterface[],
    debtorpayed: DebtorPayedInterface[]
}