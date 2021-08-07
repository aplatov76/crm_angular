import {UserInterface} from '../../../interfaces/user.interface';

export interface OrderCmInterface{
    id: number,
    data: Date,
    user: UserInterface
}