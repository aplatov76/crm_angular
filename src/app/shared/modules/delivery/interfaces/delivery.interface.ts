import { ClientInterface } from "../../../interfaces/client.interface";
import {CheckInterface} from '../../../interfaces/check.interface';

export interface DeliveryInterface{
    id: number,
    data: Date,
    description: string,
    price: number,
    client: ClientInterface,
    check: CheckInterface,
    status: number
}