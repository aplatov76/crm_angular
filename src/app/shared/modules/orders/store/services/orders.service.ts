import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import {OrderInterface} from '../../interfaces/order.interface';
import {OrderProductsListInterface} from '../../interfaces/orderProducts.interface';
import {environment} from '../../../../../../environments/environment';


@Injectable()
export class OrdersService{

    constructor(private http: HttpClient){

    }

    getAll(): Observable<OrderInterface[]>{
        return this.http.post<OrderInterface[]>(`${environment.url}/orders/all`, {})
    }

    getById(id: number): Observable<OrderProductsListInterface>{
        //console.log(id)
        return this.http.post<OrderProductsListInterface>(`${environment.url}/orders/id`, {id})
    }
}