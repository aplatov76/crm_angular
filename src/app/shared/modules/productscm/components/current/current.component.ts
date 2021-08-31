import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { Observable, of, Subject,  Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import { ProductInterface } from "../../../../interfaces/product.interface";

import { NzModalRef } from "ng-zorro-antd/modal";
import { ProductsCmService } from "../../store/services/productscm.service";
import { ProductCmInterface } from "../../interfaces/productcm.interface";
import { orderInsertAction } from "../../../ordercm/store/actions/action";
import { PersistanceService } from "src/app/shared/services/persistence.service";

@Component({
    selector: 'productcm-component',
    templateUrl: './current.component.html',
    styleUrls: ['./current.component.css']
})
export class CurrentCmProductComponent implements OnInit, OnDestroy{

    form: FormGroup
    toOrderForm: FormGroup

    @Input() product: ProductCmInterface
    url: string
    currentProductCountCm$: Observable<number>

    currentParent: number[] = [];

    onChange($event: string[]): void {
      console.log($event);
    }

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private modal: NzModalRef,
        private productService: ProductsCmService,
        private persistanceService: PersistanceService
    ){}

    ngOnInit(): void {
        this.url  = `https://images.tdcsm.ru/${this.product.articul}/normal`;
        this.initializeSubscription();
    }

    ngOnDestroy(): void{
      //this.currentProduct$.unsubscribe();
    }

    initializeSubscription(){

        this.currentProductCountCm$ = this.productService.getCountCm({articul: this.product.articul});
        this.initializeForm();
    }

    initializeForm(){

        this.form = this.fb.group({
            trade_price: new FormControl({value: `${this.product.price} за ${this.product.unit}`, disabled: true}, Validators.required),
            count: [0, [Validators.required, Validators.min(1)]],
            articul: [{value: this.product.articul, disabled: true}, [Validators.required]]
        });

        this.toOrderForm = this.fb.group({
            quantity:  [0, [Validators.required, Validators.min(1)]],
            percent:  [1.3, [Validators.required, Validators.min(1)]],
            price:  [ Math.floor(this.product.price*1.3), [Validators.required, Validators.min(1)]]
        })
    }

    submit(){
      //console.log(this.form)
      this.store.dispatch(orderInsertAction({orderdata: [{id: 0, unit: 1, cmorderid: null, title: this.product.title, articul: this.product.articul, quantity: this.form.value.count}]}))
      this.modal.close();
      
    }

    setPrice(){

        const price = Math.floor((this.product.price*this.toOrderForm.controls.percent.value));

        this.toOrderForm.controls.price.setValue(price);
    }

    toOrderSubmit(){
    
        const array = this.persistanceService.get('orderdata') || [];

        array.push({title: this.product.title, quantity: this.toOrderForm.controls.quantity.value, price: this.toOrderForm.controls.price.value })

        this.persistanceService.set('orderdata', array )

        console.log(this.persistanceService.get('orderdata'));
    }

    close(){
        this.modal.close()
    }
    
}