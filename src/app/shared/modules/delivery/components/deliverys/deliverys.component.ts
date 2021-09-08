import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { DeliveryInterface } from '../../interfaces/delivery.interface';
import { deliverysAction } from '../../store/actions/actions';

import {isDeliverys} from '../../store/selectors';
import {CreateDeliveryComponent} from '../create/create.delivery';


@Component({
    selector: 'deliverys-component',
    templateUrl: './deliverys.component.html'
})
export class DeliverysComponent implements OnInit{

    deliverys$: Observable<DeliveryInterface[]>

    constructor(
        private store: Store,
        private modalService: NzModalService,
        private viewContainerRef: ViewContainerRef
    ){

    }

    ngOnInit(){

        this.store.dispatch(deliverysAction());
        this.initializeSubscription();
    }

    initializeSubscription(){
        this.deliverys$ = this.store.pipe(select(isDeliverys));
    }

    openCreateDeliveryModal(): void{
        this.modalService.create({
            nzTitle: 'Cоздание новой доставки',
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
              //id: id
            },
            nzFooter: [],
            nzStyle: { width: '80%' },
            nzAutofocus: null,
            nzContent: CreateDeliveryComponent
        })
    }

}