import {Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';
import {Store, select} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import { SalesInterface } from '../../../interfaces/sales.interface';
import { salesAction, addSaleAction } from '../store/actions/action';
import {isLoadingSelector, isSubmittingSelector, currentDataSelector, currentError, currentRes } from '../store/selectors';
import {currentDataSelector as currentPraisSelector, currentProductSelector} from '../../../utilmodules/prais/store/selectors';
import {CurrentSale} from '../interfaces/currentSale.interface';
import { PraisInterface } from '../../../interfaces/prais.interface';
import { praisAction, productAction } from '../../../utilmodules/prais/store/actions/action';
import { ProductInterface } from '../../../interfaces/product.interface';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, OnDestroy{

    sales: SalesInterface[]
    error: string = null
    errorSubscription : Subscription
    resSubscription : Subscription
    sum: number = 0
    
    salesSubscription: Subscription
    isLoading$ : Observable<boolean>
    praisList$: Observable<PraisInterface[]>

    isType: number = 0
    currentSale: CurrentSale[] = []
    isCurrentProduct: ProductInterface
    isCurrentProduct$: Subscription
    praisList: PraisInterface[] = null

    form: FormGroup

    constructor(private store: Store, private fb: FormBuilder){

    }

    ngOnInit(): void {

        this.store.dispatch(salesAction())
        this.store.dispatch(praisAction())
        
        this.praisList$ = this.store.pipe(select(currentPraisSelector))
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        //this.error$ = this.store.pipe(select(currentError))

        this.initializeListeners()

        this.salesSubscription = this.store.pipe(select(currentDataSelector), filter(Boolean))
        .subscribe((currentSales: SalesInterface[]) => {
            //console.log(currentSales)
            this.sales = currentSales
            this.sum = this.sales.reduce((sum, current) => (sum + current.price*current.quantity), 0)
        })

        this.resSubscription = this.store.pipe(select(currentRes), filter(Boolean))
            .subscribe((res: any) => {
                //console.log('res subscribe', res[0])

                if(!res[0]){
                    this.currentSale = []
                    this.error = null
                }
                    else this.currentSale = this.currentSale.map(el => ((res[0].findIndex(item => item.jtin_id === el.id) !== -1 ) ? ({...el, err: true}) : ({...el, err: false})))
            })

        this.errorSubscription = this.store.pipe(select(currentError), filter(Boolean))
        .subscribe((res: any) => {
            //console.log('err subscribe', res.message)
            this.error = res.message
            this.currentSale = this.currentSale.map(el => ({...el, err: true}))
        })

    }

    ngOnDestroy(): void {
        this.salesSubscription.unsubscribe()
        this.isCurrentProduct$.unsubscribe()
        this.resSubscription.unsubscribe()
        this.errorSubscription.unsubscribe()
    }

    initializeListeners(): void{

    
        this.isCurrentProduct$ = this.store.pipe(select(currentProductSelector), filter(Boolean))
            .subscribe((res: ProductInterface[]) => {
                this.isCurrentProduct = res[0]
                
                if(res)this.initializeForm()
            })

    }

    initializeForm(){
        this.form = this.fb.group({
            //title: new FormControl(null, Validators.required),
            id: [this.isCurrentProduct.id, [Validators.required]],
            stock: [this.isCurrentProduct.stock, [Validators.required]],
            price: [this.isCurrentProduct.price, [Validators.required]],
            quantity: ['', [Validators.required, Validators.min(1), Validators.max(this.isCurrentProduct.stock)]],
            sum: [100, [Validators.required]]
        })
    }

    getTypeSearch(): string {
        switch(this.isType){
            case 0: return 'наименованию'
            case 1: return 'коду'
            case 2: return 'артикулу'
        }
    }

    onInput(){
        const quantity = this.form.controls.quantity.value
        const price = this.form.controls.price.value
        this.form.controls.sum.setValue(quantity*price)
    }

    onChange($event) {
        //console.log('value: ', $event );
        this.store.dispatch(productAction({id: $event.id}))
    }

    submit(){

       const searchDublicate =  this.currentSale.find(res => res.id === this.isCurrentProduct.id) || null

       if(searchDublicate){
           this.error = 'Позиция уже есть в списке';
       }
       if(this.form.controls.quantity.invalid){
           this.error = 'Нет такого количества товара';
       }

       if(!this.form.invalid && searchDublicate === null){
            this.currentSale.push({
                id: this.isCurrentProduct.id,
                title: this.isCurrentProduct.title, 
                quantity: this.form.controls.quantity.value,
                prais: this.isCurrentProduct.price,
                sum: this.form.controls.quantity.value*this.isCurrentProduct.price
            })
        }
    }

    deletItemCurrentSales(id){
        this.currentSale = this.currentSale.filter(el => el.id != id)
    }

    saleDispatch(){
        //this.store.dispatch(productAction({id: this.isCurrentProduct.id}))
        console.log('currentSale: ', this.currentSale)
        this.store.dispatch(addSaleAction({currentSales: this.currentSale}))
        //this.currentSale = []

    }


    
}