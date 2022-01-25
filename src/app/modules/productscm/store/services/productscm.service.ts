import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductsCmInterface } from '../../interfaces/productscm.interface';
import { ProductCmHistory } from '../../interfaces/productCmHistory.interface';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProductsCmService {
  constructor(private http: HttpClient) {}

  getProducts(query?: any): Observable<ProductsCmInterface[]> {
    let queryParams: string = '';

    if (query.parent) queryParams += `parent=${query.parent}`;

    return this.http.get<ProductsCmInterface[]>(
      `${environment.url}/cm?${queryParams}`
    );
  }

  getCountCm(query: any): Observable<number> {
    return this.http.get<number>(
      `${environment.url}/cm/count?articul=${query.articul}`
    );
  }

  getHistoryPriceData(articul: number): Observable<ProductCmHistory> {
    return this.http.get<ProductCmHistory>(
      `${environment.url}/cm/statistic?articul=${articul}`
    );
  }

  pushProductCmPrice(): void {
    this.http
      .post(`${environment.url}/cm/statistic`, {})
      .subscribe(() => {})
      .unsubscribe();
  }

  pushFiles(files: File[]): Observable<any> {
    //console.log(files[0]);
    const uploadData = new FormData();
    Array.from(files).map((file) => {
      console.log(file);
      uploadData.append('files', file, file.name);
    });

    return this.http.post(`${environment.url}/cm/`, uploadData, {});
  }

  removeCurrentPrices(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${environment.url}/cm/statistic`
    );
  }
}
