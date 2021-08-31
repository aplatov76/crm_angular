import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import {DeliveryInterface} from '../../interfaces/delivery.interface';
import { ClientInterface } from 'src/app/shared/interfaces/client.interface';
import {environment} from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { CheckInterface } from "src/app/shared/interfaces/check.interface";

@Injectable()
export class DeliveryService{

    constructor(private http: HttpClient){

    }

    getAll(): Observable<DeliveryInterface[]>{
        return this.http.get<DeliveryInterface[]>(`${environment.url}/delivery`, {});
    }

    getDelivery(id: number): Observable<DeliveryInterface>{
        return this.http.get<DeliveryInterface>(`${environment.url}/delivery?id=${id}`);
    }

    createDelivery(delivery: DeliveryInterface): Observable<DeliveryInterface>{
        return this.http.post<DeliveryInterface>(`${environment.url}/delivery`, {delivery});
    }

    closeDelivery(id: number): Observable<DeliveryInterface>{

        return this.http.put<DeliveryInterface>(`${environment.url}/delivery`, {id});
    }

    getClients(): Observable<ClientInterface[]>{
        return this.http.get<ClientInterface[]>(`${environment.url}/client`)//.pipe(map((items) => items))
    }

    getChecks(): Observable<CheckInterface[]>{

        return this.http.get<CheckInterface[]>(`${environment.url}/check?limit=10`)
    }

}