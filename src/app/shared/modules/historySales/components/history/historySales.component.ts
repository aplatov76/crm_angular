import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SalesInterface } from '../../../sales/interfaces/sales.interface';
import { SalesService } from '../../../sales/store/services/sales.service';
import {CurrentHistorySalesComponent} from '../current/current.component';
import { DatePipe } from '@angular/common';
import {PraisInterface} from '../../../../interfaces/prais.interface';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import {currentDataSelector as currentPraisSelector} from '../../../../utilmodules/prais/store/selectors';
import { praisAction } from '../../../../utilmodules/prais/store/actions/action';
import { returnSalesAction } from '../../../returnSales/store/actions/actions';
import { ReturnSalesInterface } from '../../../returnSales/interfaces/returnSales.interface';
import { isReturnSalesSelector } from '../../../returnSales/store/selectors';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Data } from '@angular/router';

@Component({
    selector: 'history-sales',
    templateUrl: './historySales.component.html',
    styleUrls: ['historySales.component.css']
})
export class HistorySalesComponent implements OnInit, OnDestroy{

    constructor(
        private salesService: SalesService,
        private store: Store,
        private datepipe: DatePipe,
        private viewContainerRef: ViewContainerRef,
        private modalService: NzModalService)
        {

        }

    visible = false
    dt: Date = new Date()
    dateFormat = 'yyyy-MM-dd';
    daterangepickerModel: Date[] = []
    sales$: Observable<SalesInterface[]>
    praisList$: Observable<PraisInterface[]>

    ngOnInit(): void{

        this.store.dispatch(praisAction())
        this.initializeSubscription();

    }

    ngOnDestroy(): void{
      
    }

    initializeSubscription(): void{

        this.praisList$ = this.store.pipe(select(currentPraisSelector));

    }

    getSales(){
        //console.log(this.daterangepickerModel[0].toString())
        this.sales$ = this.salesService.getSales(this.datepipe.transform(this.daterangepickerModel[0], 'yyyy-MM-dd'), this.datepipe.transform(this.daterangepickerModel[1], 'yyyy-MM-dd'))
        //this.store.dispatch(returnSalesAction({databegin: this.datepipe.transform(this.daterangepickerModel[0], 'yyyy-MM-dd'), dataend: this.datepipe.transform(this.daterangepickerModel[1], 'yyyy-MM-dd')}))
    }

    onChange(target) {
        console.log(target)
        this.sales$ = this.salesService.getSales(this.datepipe.transform(this.daterangepickerModel[0], 'yyyy-MM-dd'), this.datepipe.transform(this.daterangepickerModel[1], 'yyyy-MM-dd'), target.id);
        /*
        this.returnSales$ = this.returnSales$.pipe(
            map((items: ReturnSalesInterface[]) => 
                    items.map((item: ReturnSalesInterface) => 
                                {
                                    //console.log(item)
                                    //console.log((item.sale.product.id === target.id))
                                    //console.log('map: ', ((item.sale.product.id === target.id) ? ({...item, visible: true}) : ({...item, visible: false})))
                                    return ((item.sale.product.id === target.id) ? ({...item, visible: true}) : ({...item, visible: false}))
                                }
                    ))
        )
        */
    }

    showModal(id: number, data: Data){

            this.modalService.create({
                nzTitle: `Чек № ${id} от ${data}`,
                nzViewContainerRef: this.viewContainerRef,
                nzComponentParams: {
                    id: id
                },
                nzFooter: [],
                nzStyle: { width: '80%' },
                nzAutofocus: null,
                nzContent: CurrentHistorySalesComponent
            });

        
    }


}