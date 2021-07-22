import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { Observable } from "rxjs";
import { PraisInterface } from "src/app/shared/interfaces/prais.interface";
import {currentDataSelector as currentPraisSelector} from '../../../../utilmodules/prais/store/selectors';
import { SalesInterface } from "../../../sales/interfaces/sales.interface";
import { SalesService } from "../../../sales/store/services/sales.service";

@Component({
    selector: 'create-return-sale',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateReturnSaleComponent implements OnInit{

    praisList$: Observable<PraisInterface[]>
    selectSales$: Observable<SalesInterface[]>

    currentId: number
    dataBegin: Date =  new Date();

    constructor(private store: Store, private salesService: SalesService, public modalService: BsModalService){

    }

    ngOnInit(): void{
        this.praisList$ = this.store.pipe(select(currentPraisSelector));

        this.selectSales$ = this.salesService.getSales();
    }

    onChange($target: any): void{

        this.currentId = $target.id;

        const date = new Date();
             date.setDate(this.dataBegin.getDate() - 14)
      ////  date.setDate( date.getDate() -14);

        this.selectSales$ = this.salesService.getSales(date.toISOString().slice(0, 10), this.dataBegin.toISOString().slice(0, 10), this.currentId)

        console.log(date)
    }

}