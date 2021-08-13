import {UserInterface} from '../../../interfaces/user.interface';
import {OrderCmDataInterface} from './ordercmdata.interface'

export interface OrderCmInterface{
    id: number,
    data: Date,
    user: UserInterface,
    status: number,
    orderdata?: OrderCmDataInterface[]
}