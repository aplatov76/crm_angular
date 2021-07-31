import { ProductsCmInterface } from "../../interfaces/productscm.interface";
import {ErrorMessageInterface} from '../../../../interfaces/errMessages.interface';

export interface ProductsCmStateInterface{
    products: ProductsCmInterface[],
    loading: boolean,
    err: ErrorMessageInterface
}