import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientInterface } from 'src/app/shared/interfaces/client.interface';
import { OrderInterface } from '../../interfaces/order.interface';
import { environment } from '../../../../../../environments/environment';
import { CreateOrderInterface } from '../../interfaces/createOrder.interface';

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(
      `${environment.url}/order`,
      {}
    );
  }

  getOrder(id: number): Observable<OrderInterface> {
    return this.http.get<OrderInterface>(
      `${environment.url}/order?id=${id}`
    );
  }

  orderPay(id: number, sum: number): Observable<OrderInterface> {
    return this.http.put<OrderInterface>(`${environment.url}/order`, {
      order: { id, paid: sum }
    });
  }

  getClients(): Observable<ClientInterface[]> {
    return this.http.get<ClientInterface[]>(
      `${environment.url}/client`
    );
  }

  createOrder(
    order: CreateOrderInterface
  ): Observable<OrderInterface> {
    return this.http.post<OrderInterface>(
      `${environment.url}/order`,
      { order }
    );
  }
}
