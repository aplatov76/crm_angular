import { Component, Input, OnDestroy, OnInit } from "@angular/core";

import { mergeMap, filter, map, first } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SalesInterface } from '../../interfaces/sales.interface';
import {Store, select} from '@ngrx/store';
import {isLoadingSelector, isSubmittingSelector, currentSalesSelector, currentError, currentCassaValue } from '../../store/selectors';
import { SalesService } from "../../store/services/sales.service";
import {CassaValueInterface} from '../../interfaces/cassaValue.interface';
import { DatePipe } from "@angular/common";
import { ReturnSalesService } from "../../../returnSales/store/services/returnSales.service";
import { ReturnSalesInterface } from "../../../returnSales/interfaces/returnSales.interface";

@Component({
    selector: 'report-sales',
    templateUrl: 'report.component.html',
    styles: ['report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy{

    @Input('data') data: Date 

    /*Как указать тип возвращаемогbleо обсервабле в forkJoin*/
    forkData$: Subscription
    currentSales: SalesInterface[]
    currentReturnSales: ReturnSalesInterface[]
    currentCassa: CassaValueInterface

    returnsum: number
    sum: number
    

    constructor(private store: Store, private salesService: SalesService, private returnedSalesService: ReturnSalesService, public modalService: BsModalService, private datepipe: DatePipe){

    }
    
    ngOnInit(): void{null
        this.initializeSubscription()
        //console.log(this.datepipe.transform(this.data, 'yyyy-MM-dd'))
    }

    ngOnDestroy(): void{
        this.forkData$.unsubscribe();
    }

    initializeSubscription(){

       // console.log('hello subscription')

        /*
         = combineLatest(
                        this.store.pipe(select(currentSalesSelector)),
                        this.store.pipe(select(currentCassaValue))
                     ).pipe(
                         map(
                             ([currentSales, cassaValue]: [SalesInterface[] | null, CassaValueInterface | null]) => {


                                return {sales: currentSales, cassa: cassaValue}
                             }
                         )
                     )
                     .subscribe(value => {
                         console.log(value)
        })*/

        const currentData = this.datepipe.transform(this.data, 'yyyy-MM-dd');
        this.forkData$ = forkJoin([
            //this.store.pipe(select(currentSalesSelector), filter(Boolean), first()),
            this.salesService.getSales(currentData, currentData),
            this.salesService.getCassaValue(currentData),
            this.returnedSalesService.getReturnSales()
        ]).subscribe(
            ([currentSales, cassa, returnsales]: [SalesInterface[], CassaValueInterface, ReturnSalesInterface[]]) => {
            
            this.currentSales = currentSales;
            this.currentReturnSales = returnsales;
            this.currentCassa = cassa;
            
            this.sum = this.currentSales.reduce((sum, current) => (sum + current.price*current.quantity), 0)
            this.returnsum = this.currentReturnSales.reduce((sum, current) => (sum + current.sale.price*current.quantity), 0)
            
        })          

    }

}