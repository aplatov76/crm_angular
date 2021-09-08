import {SalesInterface} from '../../interfaces/sales.interface';
import { CassaValueInterface } from '../../interfaces/cassaValue.interface';
import { CheckInterface } from 'src/app/shared/interfaces/check.interface';

export interface SalesStateInterface {
    err?: any,
    currentSales: SalesInterface[] | null,
    currentSaleCompleted: CheckInterface[]
    cassa: CassaValueInterface,
    isLoading: boolean,
    isSubmiting: boolean
}