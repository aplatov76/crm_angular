import { ProductCmInterface } from "./productcm.interface";

export interface ProductsCmInterface extends ProductCmInterface{

    children: ProductsCmInterface[] | null
}