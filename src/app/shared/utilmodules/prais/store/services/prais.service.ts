import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { PraisInterface } from '../../../../interfaces/prais.interface';
import { ProductInterface } from '../../../../interfaces/product.interface';

@Injectable()
export class PraisService {
  constructor(private http: HttpClient) {}

  getPrais(): Observable<PraisInterface[]> {
    return this.http.get<PraisInterface[]>(
      `${environment.url}/product?type=product&view=table`
    );
  }

  getProductById(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(
      `${environment.url}/product?id=${id}`
    );
  }
}
