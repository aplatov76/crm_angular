import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


import {OrderCmInterface} from '../../interfaces/ordercm.interface';
import {ordersCmAction} from '../../store/actions/action';
import {isOrdersList} from '../../store/selectors'
import { CurrentCmOrderComponent } from '../current/current.component';

@Component({
    selector: 'ordercm',
    templateUrl: './ordercm.component.html',
    styleUrls: ['./ordercm.component.css']
})
export class OrderCmComponent implements OnInit{

    orders$: Subscription
    orders: OrderCmInterface[]
    dateFormat = 'yyyy/MM/dd';
    daterangepickerModel: Date[] = []
    lastOrder: number = null

    constructor(
        private store: Store,
        private modalService: NzModalService,
        private viewContainerRef: ViewContainerRef,
        
        private datepipe: DatePipe
        ){

    }

    ngOnInit(): void{
        this.store.dispatch(ordersCmAction({query: {}}));

        this.initializeSubscription();
    }

    initializeSubscription(): void{

        this.orders$ = this.store.pipe(select(isOrdersList), filter(Boolean)).subscribe((item: OrderCmInterface[]) => {
            this.orders = item;
            console.log('item: ',item[0])
            if(item.length > 1)this.lastOrder = (item[0].status === 0) ? item[0].id : null;
        })
    }

    onClick(id: number, data: string): void{

        this.modalService.create({
            nzTitle: `Заявка № ${id} от ${data}`,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
              id: id
            },
            nzFooter: [],
            nzStyle: { width: '80%' },
            nzAutofocus: null,
            nzContent: CurrentCmOrderComponent
          });

    }

    createEmptyOrder(): void{

        //console.log('last order now: ', this.lastOrder)

        this.modalService.create({
            nzTitle: `Cоздание новой заявки`,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
              id: this.lastOrder
            },
            nzFooter: [],
            nzStyle: { width: '80%' },
            nzAutofocus: null,
            nzContent: CurrentCmOrderComponent
          });

    }

    showWithInperiod(){

        this.store.dispatch(ordersCmAction({query: {databegin: this.datepipe.transform(this.daterangepickerModel[0], 'yyyy-MM-dd'), dataend: this.datepipe.transform(this.daterangepickerModel[1], 'yyyy-MM-dd')}}))
    }
    
}