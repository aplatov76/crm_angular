import { Injectable } from "@angular/core";
import { ProductsCmInterface } from "../../interfaces/productscm.interface";
import { ProductCmHistory } from '../../interfaces/productCmHistory.interface';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import {environment} from '../../../../../../environments/environment';

@Injectable()
export class ProductsCmService{

    constructor(private http: HttpClient){
        
    }

    getProducts(query?: any): Observable<ProductsCmInterface[]> {

        //console.log(`query in products: `, query)

        let queryParams: string = '';
        
        if(query.parent)queryParams = queryParams + `parent=${query.parent}`;


        return this.http.get<ProductsCmInterface[]>(`${environment.url}/cm?${queryParams}`);
    }

    getCountCm(query: any): Observable<number>{
        //console.log('query product count cm: ',query)

        return this.http.get<number>(`${environment.url}/cm/count?articul=${query.articul}`);
    }

    getHistoryPriceData(articul: number): Observable<ProductCmHistory>{

        return this.http.get<ProductCmHistory>(`${environment.url}/cm/statistic?articul=${articul}`);
    }

    pushProductCmPrice(): void{
        //console.log('push  price product cm')
        
        this.http.post(`${environment.url}/cm/statistic`, {}).subscribe(item => {
           //console.log('success load') 
        }).unsubscribe();
    }

    removeCurrentPrices(): Observable<{message: string}>{
        return this.http.delete<{message: string}>(`${environment.url}/cm/statistic`);
    }

}