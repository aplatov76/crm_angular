import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from "ng-zorro-antd/modal";

import { Observable, of, Subject,  Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import {orderDataCmAction, orderInsertAction, orderDataCmRemoveAction, orderDataCmSendAction} from '../../store/actions/action';

import { OrderCmService } from "../../store/services/ordercm.service";
import { isCurrentOrder } from "../../store/selectors";
import { OrderCmDataInterface } from "../../interfaces/ordercmdata.interface";
import {OrderCmInterface} from "../../interfaces/ordercm.interface";
import {units} from '../../../../utilmodules/units/units.data';
//import { ProductCmInterface } from "../../interfaces/productcm.interface";

@Component({
    selector: 'current-cm-order-component',
    templateUrl: './current.component.html',
    styleUrls: ['./current.component.css']
})
export class CurrentCmOrderComponent implements OnInit, OnDestroy{

    formTable: FormGroup

    @Input() id: number

    currentOrderData$: Subscription
    sendBtn: boolean = true

    units = units;

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private modal: NzModalRef,
        private orderService: OrderCmService
    ){}

    ngOnInit(): void {
        this.store.dispatch(orderDataCmAction({id: this.id}))
        this.initializeSubscription();
    }

    ngOnDestroy(): void{
      this.currentOrderData$.unsubscribe();
    }

    initializeSubscription(){

        this.currentOrderData$ = this.store.pipe(select(isCurrentOrder),  filter(Boolean)).subscribe(
            (item: OrderCmInterface) => this.initializeForm(item)
        )

        //this.currentProductCountCm$ = this.productService.getCountCm({articul: this.product.articul});
        //this.initializeForm();
    }

    //trade_price: new FormControl({value: `${this.product.price} ${this.product.unit}`, disabled: true}, Validators.required),
    //count: [0, [Validators.required, Validators.min(1)]],
    // articul: [{value: this.product.articul, disabled: true}, [Validators.required]]
    initializeForm(order: OrderCmInterface){

         if(order.status === 1)this.sendBtn = false;

        this.formTable = this.fb.group({
            tableRows: this.fb.array(order.orderdata.map(item => {
                //console.log(item)
                return this.fb.group({
                    id: [item.id],
                    articul: [item.articul],
                    title: [item.title],
                    quantity: [item.quantity, [Validators.required, Validators.min(1)]],
                    unit: [item.unit.id, [ Validators.required]],
                    description: ['']
                  })
            }))
        })

    }

    send(){
        //console.log('form data: ', (this.formTable.value.tableRows))
        this.store.dispatch(orderDataCmSendAction({orderdata: this.formTable.value.tableRows}));
        this.modal.close();
    }

    addRow(){
        (<FormArray>this.formTable.get('tableRows')).push(
            this.fb.group({
                id: [0],
                articul: [null],
                title: [''],
                quantity: [0, [Validators.required, Validators.min(1)]],
                unit: [1, [ Validators.required]],
                description: ['']
              })
        )
    }

    removeRow(id_in_db: number, index: number) {
        //console.log(id_in_db, index)
        if(id_in_db !== 0)this.store.dispatch(orderDataCmRemoveAction({id: id_in_db}));

        //т.к. не делаею dispatch (он удалит все поля которые добавлены но не отправлены в БД)
        (<FormArray>this.formTable.get('tableRows')).removeAt(index);

        console.log(this.formTable)
    }

    submit(){
      this.modal.close();
    }
    
}