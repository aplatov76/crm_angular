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

    getAllProducts(query?: any): Observable<ProductsInterface[]> {

        console.log(`query in products: `,query)

        let queryParams: string = '';
        if(query.view){
            queryParams = queryParams + `view=${query.view}`;
        }

        return this.http.get<ProductsInterface[]>(`${environment.url}/product?${queryParams}`,);
    }

    getProduct(id: number): Observable<ProductInterface>{
        return this.http.get<ProductInterface>(`${environment.url}/product?id=${id}`);
    }

    getGroups(): Observable<GroupsInterface[]>{
        return this.http.get<GroupsInterface[]>(`${environment.url}/product?type=group`);
    }

    saveProduct(product: ProductInterface): Observable<any>{
        return this.http.post<ProductInterface>(`${environment.url}/prais/save`, {product});
    }

}