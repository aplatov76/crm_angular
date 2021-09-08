import {Injectable} from '@angular/core'
import { HttpClient} from '@angular/common/http';
import { SalesInterface } from '../../interfaces/sales.interface';
import { Observable } from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import { PraisInterface } from '../../../../interfaces/prais.interface';
import {CurrentSaleInterface} from '../../interfaces/currentSale.interface';
import {CassaValueInterface} from '../../interfaces/cassaValue.interface';
import { OrderInterface } from '../../../orders/interfaces/order.interface';
import { DebtorInterface } from '../../../debtors/interfaces/debtor.interface';
import { DebtorPayedInterface } from '../../../debtors/interfaces/debtorPayed.interface';
import { CurrentDelivery } from '../../interfaces/currentDelivery.interface';

@Injectable()
export class SalesService{

    constructor(private http: HttpClient){

    }

    getSales(databegin: string = new Date().toISOString().slice(0, 10), dataend: string = new Date().toISOString().slice(0, 10), productId?: number, order?: string): Observable<SalesInterface[]> {

        //const currentData = new Date().toISOString().slice(0, 10);
        //console.log(databegin)

        let query = `databegin=${databegin}&dataend=${dataend} 23:59`;

        if(productId){
            query = query + `&productid=${productId}`;
        }
        if(order){
            query = query + `&order=${order}`;
        }

        return this.http.get<SalesInterface[]>(`${environment.url}/sales?${query}`);
    }

    getCheck(checkid: number): Observable<SalesInterface[]> {

        let query = '';

        if(checkid)query = query + `&checkid=${checkid}`;

        return this.http.get<SalesInterface[]>(`${environment.url}/sales?${query}`);
    }

    getPrais():Observable<PraisInterface[]> {
        return this.http.get<PraisInterface[]>(`${environment.url}/product?type=product`);
    }

    setSale(currentSules: CurrentSaleInterface[], delivery: CurrentDelivery ): Observable<any> {

        const serviceCurrentSules = currentSules.map(el => ({id: el.id, quantity:  el.quantity}))
        
        return this.http.post<any>(`${environment.url}/sales`, {sale: serviceCurrentSules, delivery: delivery});
    }

    getCassaValue(data: string = new Date().toISOString().slice(0, 10)): Observable<CassaValueInterface>{

        return this.http.get<CassaValueInterface>(`${environment.url}/cassa?data=${data}`);
    }

    getOrdersPayed(databegin: string = new Date().toISOString().slice(0, 10), dataend: string = new Date().toISOString().slice(0, 10)): Observable<OrderInterface[]>{

        return this.http.get<OrderInterface[]>(`${environment.url}/order/payed?databegin=${databegin}&dataend=${dataend} 23:59`);
    }

    getDebtorPayed(databegin: string = new Date().toISOString().slice(0, 10), dataend: string = new Date().toISOString().slice(0, 10)): Observable<DebtorInterface[]>{

        return this.http.get<DebtorInterface[]>(`${environment.url}/debtors/payed?databegin=${databegin}&dataend=${dataend} 23:59`)
    }

    setCassaValue(sum: number): Observable<CassaValueInterface>{

        return this.http.post<CassaValueInterface>(`${environment.url}/cassa`, {cassa: {sum}})
    }


}