import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import {DebtorInterface} from '../../interfaces/debtor.interface';
import {environment} from '../../../../../../environments/environment';
import { ClientInterface } from "src/app/shared/interfaces/client.interface";
import {CreateDebtorInterface} from '../../interfaces/createDebtor.interface'

@Injectable()
export class DebtorsService{

    constructor(private http: HttpClient){

    }

    getAll(): Observable<DebtorInterface[]>{
        return this.http.get<DebtorInterface[]>(`${environment.url}/debtors`, {})
    }

    getDebtor(id: number): Observable<DebtorInterface>{
        return this.http.get<DebtorInterface>(`${environment.url}/debtors/${id}`)
    }

    debtorPay(id: number, sum: number): Observable<DebtorInterface>{
        return this.http.put<DebtorInterface>(`${environment.url}/debtors/pay`, {debtor: {id, sum: sum}})
    }

    getClients(): Observable<ClientInterface[]>{
       return this.http.get<ClientInterface[]>(`${environment.url}/client`);
    }

    createDebtor(debtor: CreateDebtorInterface): Observable<DebtorInterface>{
        console.log(debtor);

        return this.http.post<DebtorInterface>(`${environment.url}/debtors`, {debtor})
    }

    updateDebtor(debtor: CreateDebtorInterface): Observable<DebtorInterface>{
        console.log(debtor);

        return this.http.put<DebtorInterface>(`${environment.url}/debtors/update`, {debtor})
    }
}