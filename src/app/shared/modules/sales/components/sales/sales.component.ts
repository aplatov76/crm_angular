import {Component, TemplateRef, OnInit, OnDestroy, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';
import {Store, select} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

import { SalesInterface } from '../../interfaces/sales.interface';
import { salesAction, addSaleAction, cassaAction } from '../../store/actions/action';
import {isLoadingSelector, isSubmittingSelector, currentSalesSelector, currentError, currentCassaValue } from '../../store/selectors';
import {CurrentSaleComponent} from '../current/current.component'

import { praisAction, productAction } from '../../../../utilmodules/prais/store/actions/action';
import { CassaValueInterface } from '../../interfaces/cassaValue.interface';
import { returnSalesAction } from '../../../returnSales/store/actions/actions';
import { isReturnSalesSelector } from '../../../returnSales/store/selectors';
import { ReturnSalesInterface } from '../../../returnSales/interfaces/returnSales.interface';
import { CassaModalComponent } from '../cassamodal/cassamodal.component';
import { ReportComponent } from '../report/report.component';

@Component({
    selector: 'sales',
    templateUrl: './sales.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, OnDestroy{

    isCollapsed: boolean = false 

    sales: SalesInterface[]
    errorSubscription : Subscription
    sum: number = 0
    returnSum: number = 0
    currentSum: number =  0
    dt: Date = new Date()
    
    salesSubscription: Subscription
    returnSalesSubscription: Subscription
    isLoading$ : Observable<boolean>
    currentCassa$: Observable<CassaValueInterface>


    constructor(
        private store: Store, 
        private fb: FormBuilder, 
        private toastr: ToastrService,
        private modalService: NzModalService,
        private viewContainerRef: ViewContainerRef
        ){

    }

    ngOnInit(): void {

        this.store.dispatch(salesAction())
        this.store.dispatch(praisAction())
        this.store.dispatch(cassaAction())
        this.store.dispatch(returnSalesAction({}))
        
       // this.praisList$ = this.store.pipe(select(currentPraisSelector))
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.currentCassa$ = this.store.pipe(select(currentCassaValue))

        this.salesSubscription = this.store.pipe(select(currentSalesSelector), filter(Boolean))
            .subscribe((currentSales: SalesInterface[]) => {
                //console.log(currentSales)
                this.sales = currentSales
                this.sum = this.sales.reduce((sum, current) => (sum + current.price*current.quantity), 0)
        })

        this.returnSalesSubscription = this.store.pipe(select(isReturnSalesSelector), filter(Boolean))
            .subscribe((returnSales: ReturnSalesInterface[]) => {
                this.returnSum = returnSales.reduce((sum, current) => (sum + current.sale.price*current.quantity), 0)
            })


        this.errorSubscription = this.store.pipe(select(currentError), filter(Boolean)).subscribe((res: any) => this.toastr.error(`Произошла ошибка ${res.error.message}`))

    }

    openModal(template: TemplateRef<any>) {
     //   this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }

    ngOnDestroy(): void {
        this.salesSubscription.unsubscribe()
        //this.isCurrentProduct$.unsubscribe()
        this.errorSubscription.unsubscribe()
    }

    /**Запрос выбранной позиции на сервер, т.к. количество на складе и цена могут отличаться от загруженных ранее */
    onChange(target) {

        this.store.dispatch(productAction({id: target.id}))
    }

    showModal(title: string, component: number){
        
        if(component === 0)
            this.modalService.create({
                nzTitle: title,
                nzViewContainerRef: this.viewContainerRef,
                nzComponentParams: {

                },
                nzFooter: [],
                nzStyle: { width: '80%' },
                nzAutofocus: null,
                nzContent: CurrentSaleComponent
            });
        
        if(component === 1)
            this.modalService.create({
                nzTitle: title,
                nzViewContainerRef: this.viewContainerRef,
                nzComponentParams: {

                },
                nzFooter: [],
                nzStyle: { width: '80%' },
                nzAutofocus: null,
                nzContent: CassaModalComponent
            });
        if(component === 2)
            this.modalService.create({
                nzTitle: `${title} ${this.dt}`,
                nzViewContainerRef: this.viewContainerRef,
                nzComponentParams: {
                    data: this.dt
                },
                nzFooter: [],
                nzStyle: { width: '80%' },
                nzAutofocus: null,
                nzContent: ReportComponent
            });
        
    }
    
}