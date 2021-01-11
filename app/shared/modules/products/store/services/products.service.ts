import {Injectable} from '@angular/core'
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import { ProductsInterface } from '../../interfaces/products.interface';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { GroupsInterface } from '../../interfaces/groups.interface';

@Injectable()
export class ProductsService{

    constructor(private http: HttpClient){

    }

    getAllProducts(): Observable<ProductsInterface[]> {
        return this.http.post<ProductsInterface[]>(`${environment.url}/prais/allproducts`, {});
    }

    getProduct(id: number): Observable<ProductsInterface>{
        return this.http.post<ProductsInterface>(`${environment.url}/prais/product`, {id});
    }

    getGroups(): Observable<GroupsInterface[]>{
        return this.http.post<GroupsInterface[]>(`${environment.url}/prais/groups`, {});
    }

    saveProduct(product: ProductInterface): Observable<any>{
        return this.http.post<ProductInterface>(`${environment.url}/prais/save`, {product});
    }

}