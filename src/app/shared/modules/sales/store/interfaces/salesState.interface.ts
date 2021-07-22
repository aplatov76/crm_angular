import {SalesInterface} from '../../interfaces/sales.interface';
import { CassaValueInterface } from '../../interfaces/cassaValue.interface';

export interface SalesStateInterface {
    err?: any,
    currentSales: SalesInterface[] | null,
    cassa: CassaValueInterface,
    isLoading: boolean,
    isSubmiting: boolean
}