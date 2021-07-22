import {PaymentInterface} from './payment.interface';

export interface OrderInterface {
    id: number,
    total: number,
    current: number,
    data: Date,
    fullname: string,
    passport_number: string,
    passport_data: Date,
    passport_release: string
    payment?: PaymentInterface[]
}