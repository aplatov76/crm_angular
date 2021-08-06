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

@Component({
    selector: 'productcm-component',
    templateUrl: './current.component.html',
    styleUrls: ['./current.component.css']
})
export class CurrentCmProductComponent implements OnInit, OnDestroy{

    form: FormGroup

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
        private productService: ProductsCmService
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
            trade_price: new FormControl({value: `${this.product.price} ${this.product.unit}`, disabled: true}, Validators.required),
            count: [0, [Validators.required, Validators.min(1)]],
            articul: [{value: this.product.articul, disabled: true}, [Validators.required]]
        })
    }

    submit(){
      
      this.modal.close();
      
    }
    
}