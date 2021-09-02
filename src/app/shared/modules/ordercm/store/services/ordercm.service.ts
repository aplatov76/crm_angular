import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";

import {OrderCmInterface} from '../../interfaces/ordercm.interface';
import {environment} from '../../../../../../environments/environment';
import { OrderCmDataInterface } from "../../interfaces/ordercmdata.interface";

@Injectable()
export class OrderCmService{

    constructor(private http: HttpClient){

    }


    getOrders(query?: any): Observable<OrderCmInterface[]>{

        let query_request = '';

        //console.log('query: ', query)

        if(query){

            if(query.databegin && query.dataend)query_request = `databegin=${query.databegin}&dataend=${query.dataend} 23:59`;

        }

        return this.http.get<OrderCmInterface[]>(`${environment.url}/cm/orders/?${query_request}`)
    }

    getOrder(id: number): Observable<OrderCmInterface>{

        return this.http.get<OrderCmInterface>(`${environment.url}/cm/orders/${id}`)
    }

    setOrderData(orderdata: OrderCmDataInterface[]): Observable<OrderCmDataInterface[]>{
        //console.log(orderdata)
        return this.http.post<OrderCmDataInterface[]>(`${environment.url}/cm/orders/`, {orderdata})
    }

    sendOrderToCM(orderdata: OrderCmDataInterface[]): Observable<any>{
        return this.http.post<any>(`${environment.url}/cm/orders/mailer`, {orderdata})
    }

    removeDataOrder(id: number): Observable<any>{
        return this.http.delete(`${environment.url}/cm/orders/${id}`);
    }

}