import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { DebtorInterface } from '../../interfaces/debtor.interface';
import {debtorsAction} from '../../store/actions/actions';
import {currentDebtors} from '../../store/selectors';
import {DebtorComponent} from '../debtor/debtor.component';
import {CreateDebtorComponent} from '../create/create.component';

@Component({
    selector: 'debtors',
    templateUrl: './debtors.component.html'
})
export class DebtorsComponent implements OnInit{

    debtors$: Observable<DebtorInterface[]>

    constructor(
        private store: Store,
        private modalService: NzModalService,
        private viewContainerRef: ViewContainerRef
    ){

    }
    
    ngOnInit(): void{
        this.store.dispatch(debtorsAction())
        this.initializeSubscription();
        
    }

    initializeSubscription(){

        this.debtors$ = this.store.pipe(select(currentDebtors));

    }

    openSelectedDebtor(): void{
        this.modalService.create({
            nzTitle: 'Cоздание нового должника',
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
              //id: id
            },
            nzFooter: [],
            nzStyle: { width: '80%' },
            nzAutofocus: null,
            nzContent: CreateDebtorComponent
        })
    }


    
}