import {Component, OnInit} from '@angular/core';
import { Observable } from "rxjs";
import { select, Store } from '@ngrx/store';


import { ClientInterface } from "src/app/shared/interfaces/client.interface";
import { DebtorsService } from '../../store/services/debtors.service';
import { PraisInterface } from '../../../../interfaces/prais.interface';
import { praisAction } from '../../../../utilmodules/prais/store/actions/action';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import {currentDataSelector as currentPraisSelector, currentProductSelector} from '../../../../utilmodules/prais/store/selectors';
import {DebtorDataInterface} from '../../interfaces/debtorData.interface';

@Component({
    selector: 'create-debtor-component',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateDebtorComponent implements OnInit{

    clients$: Observable<ClientInterface[]>
    praisList$: Observable<PraisInterface[]>

    form: FormGroup
    currentDebtorData: DebtorDataInterface[] = []
    currentSum: number = 0

    constructor(
        private store: Store,
        private debtorService: DebtorsService,
        private fb: FormBuilder
        ){

    }


    ngOnInit(): void{

        this.clients$ = this.debtorService.getClients();
        this.store.dispatch(praisAction())

        this.initializeSuscription();

    }

    initializeForm(product: ProductInterface){
        this.form = this.fb.group({
            id: [product.id, [Validators.required]],
            stock: [{value: product.stock, disabled: true}, [Validators.required]],
            price: [{value: product.price, disabled: true}, [Validators.required]],
            quantity: [1, [Validators.required, Validators.min(1), Validators.max(product.stock)]],
            sum: [{value: product.price, disabled: true}, [Validators.required]],
            title: [product.title]
        })
    }

    initializeSuscription(){

        this.praisList$ = this.store.pipe(select(currentPraisSelector))
    }

    onClient($event){

    }

    onInput(){
        const quantity = this.form.controls.quantity.value;
        const price = this.form.controls.price.value;
        this.form.controls.sum.setValue(quantity*price);
    }

    onChange($event){
        /*Инициализировать форму будем прямо здесь, количество на складе и количество в форму могут отличаться*/
        console.log($event);

        this.initializeForm($event);
    }

    deletItem(id: number): void{

        const tmp = this.currentDebtorData.find(item => item.product.id === id);
        this.currentSum -= tmp.price*tmp.quantity;

        this.currentDebtorData = this.currentDebtorData.filter(item => item.product.id === id);
    }

    debtorDispatch(){

        console.log(this.currentDebtorData)

    }

    submit(){

        const tmp = this.form.controls;
        /**
         *  
            id: number,
            product: {id: number, title: string},
            quantity: number,
            price: number
         */
        //console.log(this.form.controls.id.value)
    
        this.currentDebtorData.push({id: 0, product: {id: tmp.id.value, title: tmp.title.value}, quantity: tmp.quantity.value, price: tmp.price.value});
        this.currentSum += tmp.quantity.value*tmp.price.value;
        
    }


}