import { ErrorMessageInterface } from "src/app/shared/interfaces/errMessages.interface";
import { DeliveryInterface } from "../../interfaces/delivery.interface";

export interface DeliverysStateInterface{

    deliverys: DeliveryInterface[],
    currentDelivery: DeliveryInterface,
    loading: boolean,
    error: ErrorMessageInterface


}