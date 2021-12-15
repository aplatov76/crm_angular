import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ProductsInterface } from '../../interfaces/products.interface';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { GroupsInterface } from '../../interfaces/groups.interface';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(query?: any): Observable<ProductsInterface[]> {
    let queryParams: string = '';
    if (query.view) queryParams += `view=${query.view}`;
    if (query.parent === null)
      queryParams += `parent=${query.parent}`;
    if (query.parent) queryParams += `parent=${query.parent}`;
    if (query.warning) queryParams += `warning=${query.warning}`;

    return this.http.get<ProductsInterface[]>(
      `${environment.url}/product?${queryParams}`
    );
  }

  getProduct(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(
      `${environment.url}/product?id=${id}`
    );
  }

  getGroups(): Observable<GroupsInterface[]> {
    return this.http.get<GroupsInterface[]>(
      `${environment.url}/product?type=group`
    );
  }

  saveProduct(product: ProductInterface): Observable<any> {
    return this.http.post<ProductInterface>(
      `${environment.url}/product`,
      { product }
    );
  }

  updateProduct(product: ProductInterface): Observable<any> {
    return this.http.put<ProductInterface>(
      `${environment.url}/product/${product.id}`,
      { product }
    );
  }

  getCountCm(query: any): Observable<number> {
    return this.http.get<number>(
      `${environment.url}/cm/count?articul=${query.articul}`
    );
  }

  removeProductOrGroup(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/product/${id}`);
  }
}
