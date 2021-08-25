import { ActivatedRoute } from "@angular/router";
import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClientInterface } from 'src/app/shared/interfaces/client.interface';
import { DebtorInterface } from '../../interfaces/debtor.interface';
import { debtorAction, debtorPayAction } from '../../store/actions/actions';
import { currentDebtor } from '../../store/selectors';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import {UpdateComponent} from '../update/update.component';

@Component({
    selector: 'debtor-component',
    templateUrl: './debtor.component.html'
})
export class DebtorComponent implements OnInit{

    //@Input('id') id: number

    currentDebtor$: Observable<DebtorInterface>
    isVisibleModal: boolean =  false
    sum: number = 0
    id: number

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private modalService: NzModalService,
        private viewContainerRef: ViewContainerRef
        ){

    }


    ngOnInit(): void{
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.store.dispatch(debtorAction({id: this.id}));
        this.initializeSubscription();
    }

    initializeSubscription(): void{

        this.currentDebtor$ = this.store.pipe(select(currentDebtor))
    }

    createPDF(){

    }

    createPDFDoc(){

    }

    handleOk(){
        this.store.dispatch(debtorPayAction({id: this.id, sum: this.sum}));
        this.isVisibleModal = false;
    }

    openSelectedDebtor(id: number): void{
        this.modalService.create({
            nzTitle: `Добавить товар`,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
              //id: id
            },
            nzFooter: [],
            nzStyle: { width: '80%' },
            nzAutofocus: null,
            nzContent: UpdateComponent
        })
    }

}