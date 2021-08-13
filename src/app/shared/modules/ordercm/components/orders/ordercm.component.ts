import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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

    orders$: Observable<OrderCmInterface[]>

    constructor(
        private store: Store,
        private modalService: NzModalService,
        private viewContainerRef: ViewContainerRef){

    }

    ngOnInit(): void{
        this.store.dispatch(ordersCmAction({query: {}}));

        this.initializeSubscription();
    }

    initializeSubscription(): void{

        this.orders$ = this.store.pipe(select(isOrdersList));
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
    
}