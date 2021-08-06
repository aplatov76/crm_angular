import { Injectable } from "@angular/core";
import { ProductsCmInterface } from "../../interfaces/productscm.interface";
import {Observable} from 'rxjs';
import { HttpClient } from "@angular/common/http";


import {environment} from '../../../../../../environments/environment';

@Injectable()
export class ProductsCmService{

    constructor(private http: HttpClient){
        
    }

    getProducts(query?: any): Observable<ProductsCmInterface[]> {

        console.log(`query in products: `, query)

        let queryParams: string = '';
        
        if(query.parent)queryParams = queryParams + `parent=${query.parent}`;


        return this.http.get<ProductsCmInterface[]>(`${environment.url}/cm?${queryParams}`);
    }

    getCountCm(query: any): Observable<number>{
        console.log('query product count cm: ',query)

        return this.http.get<number>(`${environment.url}/cm/count?articul=${query.articul}`);
    }

}