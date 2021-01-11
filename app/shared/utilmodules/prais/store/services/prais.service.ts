import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import { PraisInterface } from '../../../../interfaces/prais.interface';
import {ProductInterface} from '../../../../interfaces/product.interface';

@Injectable()
export class PraisService{

    constructor(private http: HttpClient){

    }

    getPrais():Observable<PraisInterface[]> {
        return this.http.post<PraisInterface[]>(`${environment.url}/prais/all`, {});
    }

    getProductById(id: number): Observable<ProductInterface>{
        return this.http.post<ProductInterface>(`${environment.url}/prais/product`, {id: id})
    }

}