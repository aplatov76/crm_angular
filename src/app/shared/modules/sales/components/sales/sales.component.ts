import {Component, TemplateRef, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';
import {Store, select} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

import { SalesInterface } from '../../interfaces/sales.interface';
import { salesAction, addSaleAction, cassaAction } from '../../store/actions/action';
import {isLoadingSelector, isSubmittingSelector, currentSalesSelector, currentError, currentCassaValue } from '../../store/selectors';
import {currentDataSelector as currentPraisSelector, currentProductSelector} from '../../../../utilmodules/prais/store/selectors';
import {CurrentSale} from '../../interfaces/currentSale.interface';
import { PraisInterface } from '../../../../interfaces/prais.interface';
import { praisAction, productAction } from '../../../../utilmodules/prais/store/actions/action';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { CassaValueInterface } from '../../interfaces/cassaValue.interface';
import { returnSalesAction } from '../../../returnSales/store/actions/actions';
import { isReturnSalesSelector } from '../../../returnSales/store/selectors';
import { ReturnSalesInterface } from '../../../returnSales/interfaces/returnSales.interface';

@Component({
    selector: 'sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, OnDestroy{

    isCollapsed: boolean = false
    modalRef: BsModalRef; 

    sales: SalesInterface[]
    errorSubscription : Subscription
    sum: number = 0
    returnSum: number = 0
    currentSum: number =  0
    dt: Date = new Date()
    
    salesSubscription: Subscription
    returnSalesSubscription: Subscription
    isLoading$ : Observable<boolean>
    //praisList$: Observable<PraisInterface[]>
    currentCassa$: Observable<CassaValueInterface>


    constructor(private store: Store, private fb: FormBuilder, private toastr: ToastrService, private modalService: BsModalService){

    }

    ngOnInit(): void {

        this.store.dispatch(salesAction())
        this.store.dispatch(praisAction())
        this.store.dispatch(cassaAction())
        this.store.dispatch(returnSalesAction({}))
        
       // this.praisList$ = this.store.pipe(select(currentPraisSelector))
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.currentCassa$ = this.store.pipe(select(currentCassaValue))

        //this.initializeListeners()

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
        this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }

    ngOnDestroy(): void {
        this.salesSubscription.unsubscribe()
        //this.isCurrentProduct$.unsubscribe()
        this.errorSubscription.unsubscribe()
    }
    /*
    initializeListeners(): void{
    
        this.isCurrentProduct$ = this.store.pipe(select(currentProductSelector), filter(Boolean))
            .subscribe((res: ProductInterface[]) => {
                console.log('Загрузка позиции: ', res)
                if(res){
                    this.isCurrentProduct = res[0];
                    this.initializeForm()
                }
        })
    }
    */
    /*
    initializeForm(){
        console.log('Initialize form: ', this.isCurrentProduct)
        this.form = this.fb.group({
            id: [this.isCurrentProduct.id, [Validators.required]],
            stock: [{value: this.isCurrentProduct.stock, disabled: true}, [Validators.required]],
            price: [{value: this.isCurrentProduct.price, disabled: true}, [Validators.required]],
            quantity: [1, [Validators.required, Validators.min(1), Validators.max(this.isCurrentProduct.stock)]],
            sum: [{value: this.isCurrentProduct.price, disabled: true}, [Validators.required]]
        })
    }
    */
    /*
    getTypeSearch(): string {
        switch(this.isType){
            case 0: return 'наименованию'
            case 1: return 'коду'
            case 2: return 'артикулу'
        }
    }
    */
    /*
    onInput(){
        const quantity = this.form.controls.quantity.value
        const price = this.form.controls.price.value
        this.form.controls.sum.setValue(quantity*price)
    }
    */



    /**Запрос выбранной позиции на сервер, т.к. количество на складе и цена могут отличаться от загруженных ранее */
    onChange(target) {

        this.store.dispatch(productAction({id: target.id}))
        //this.isCurrentProduct = {...target}
        //this.initializeForm()
    }

    /*
    submit(){
        
       const searchDublicate =  this.currentSale.find(res => res.id === this.isCurrentProduct.id) || null

       if(searchDublicate){

           this.toastr.warning(`"${this.isCurrentProduct.title}" уже есть в списке`);
       }
       if(this.form.controls.quantity.invalid){
           this.toastr.error(`"${this.isCurrentProduct.title}" недостаточно на складе!`);
       }

       if(!this.form.invalid && searchDublicate === null){
            this.currentSale.push({
                id: this.isCurrentProduct.id,
                quantity: this.form.controls.quantity.value,
                price: this.isCurrentProduct.price,
                title: this.isCurrentProduct.title
            });

            this.currentSum += this.isCurrentProduct.price*this.form.controls.quantity.value;
            this.toastr.success(`"${this.isCurrentProduct.title}" добавлено в текущую продажу`);
        }
    }

    */
    /*
    deletItemCurrentSales(id){
        const currentItem = this.currentSale.find(el => el.id === id);

        this.currentSum -= currentItem.price*currentItem.quantity;

        this.currentSale = this.currentSale.filter(el => el.id != id);

    }
    */
    /*
    currentSaleClose(): void{
        this.currentSale = [];
        this.currentSum = 0;
    }
    */
   /*
    saleDispatch(){
        this.store.dispatch(addSaleAction({sale: this.currentSale}));
        
        this.currentSaleClose();
    }
    */


    
}