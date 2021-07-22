import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import { ProductsInterface } from '../../interfaces/products.interface';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { GroupsInterface } from '../../interfaces/groups.interface';

@Injectable()
export class WebProductsService{

    constructor(private http: HttpClient){

    }

    getAllProducts(): Observable<ProductsInterface[]> {
        return this.http.post<ProductsInterface[]>(`${environment.url}/web/allproducts`, {});
    }

    getProduct(id: number): Observable<ProductsInterface>{
        return this.http.post<ProductsInterface>(`${environment.url}/web/product`, {id});
    }

    getGroups(): Observable<GroupsInterface[]>{
        return this.http.post<GroupsInterface[]>(`${environment.url}/web/groups`, {});
    }

    saveProduct(product: FormData): Observable<any>{

        return this.http.post<ProductInterface>(`${environment.url}/web/save`, product);
    }

    removeProduct(id: number){

        return this.http.delete(`${environment.url}/web/remove/${id}`);
    }

}