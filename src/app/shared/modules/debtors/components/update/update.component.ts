import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PraisInterface } from 'src/app/shared/interfaces/prais.interface';
import { praisAction } from 'src/app/shared/utilmodules/prais/store/actions/action';
import { DebtorDataInterface } from '../../interfaces/debtorData.interface';
import {currentDataSelector as currentPraisSelector} from '../../../../utilmodules/prais/store/selectors';

@Component({
    selector: 'update-debtor-component',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

    form: FormGroup
    currentSum: number = 0
    currentDebtorData: DebtorDataInterface[] = []
    praisList$: Observable<PraisInterface[]>

    constructor(
        private store: Store,
        private fb: FormBuilder
    ){



    }

    ngOnInit(){
        this.store.dispatch(praisAction());

        this.initializeSubscription();
    }

    initializeSubscription(){
        this.praisList$ = this.store.pipe(select(currentPraisSelector))
    }

    getTypeSearch(){

    }

    onChange($event){
        /*Инициализировать форму будем прямо здесь, количество на складе и количество в форму могут отличаться*/
        console.log($event);

        this.initializeForm($event);

    }

    initializeForm(product: any){

        this.form = this.fb.group({
            id: [product.id, Validators.required],
            quantity: [1, Validators.required],
            title: [product.title, Validators.required],
            stock: [{value: product.stock, disabled: true}],
            price: [{value: product.price, disabled: true}],
            sum: [{value: product.price, disabled: true}]
        })

    }

    deletItemCurrentDebtor(index: number){
        const removeItem = this.currentDebtorData.splice(index, 1);

        this.currentSum = this.currentSum - removeItem[0].quantity*removeItem[0].price;
    }

    onInput(){
        const quantity = this.form.controls.quantity.value
        const price = this.form.controls.price.value
        this.form.controls.sum.setValue(quantity*price)
    }

    debtorUpdateDispatch(){



    }

    submit(){

        const formValues = this.form.getRawValue();

        this.currentDebtorData.push({
            id: 0,
            product: {id: formValues.id, title: formValues.title},
            quantity: formValues.quantity,
            price: formValues.price
        })
        
        this.currentSum += formValues.quantity*formValues.price;
        //console.log(this.form.getRawValue())
    }

}