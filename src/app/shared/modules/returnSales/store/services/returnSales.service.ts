import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";

import {environment} from '../../../../../../environments/environment';
import { ReturnSalesInterface } from "../../interfaces/returnSales.interface";
import {CreateReturnSaleInterface} from '../../interfaces/createReturnSale.interface';


@Injectable()
export class ReturnSalesService{

    constructor(private http: HttpClient){

    }

    getReturnSales(databegin: string = new Date().toISOString().slice(0, 10), dataend: string = new Date().toISOString().slice(0, 10)): Observable<ReturnSalesInterface[]>{

        return this.http.get<ReturnSalesInterface[]>(`${environment.url}/returnsale?databegin=${databegin}&dataend=${dataend} 23:59`);
    }

    createReturnSale(currentReturnSale: CreateReturnSaleInterface): Observable<ReturnSalesInterface>{
        console.log('in services')
        return this.http.post<ReturnSalesInterface>(`${environment.url}/returnsale`, {returnsale: currentReturnSale});
    }

}