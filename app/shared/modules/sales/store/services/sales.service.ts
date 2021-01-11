import {Injectable} from '@angular/core'
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SalesInterface } from '../../../../interfaces/sales.interface';
import { Observable } from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import { PraisInterface } from '../../../../interfaces/prais.interface';
import {CurrentSale} from '../../interfaces/currentSale.interface';

@Injectable()
export class SalesService{

    constructor(private http: HttpClient){

    }

    getToday(): Observable<SalesInterface[]> {
        return this.http.post<SalesInterface[]>(`${environment.url}/sales/today`, {});
    }

    getPrais():Observable<PraisInterface[]> {
        return this.http.post<PraisInterface[]>(`${environment.url}/prais`, {});
    }

    setSale(currentSules: CurrentSale[]): Observable<any> {

        const serviceCurrentSules = currentSules.map(el => ({id: el.id, quantity:  el.quantity}))
        
        return this.http.post<any>(`${environment.url}/sales/add`, serviceCurrentSules);
    }

}