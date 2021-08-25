import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from "ng-zorro-antd/modal";

import { Observable, of, Subject,  Subscription } from "rxjs";

import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import {orderDataCmAction, orderInsertAction, orderDataCmRemoveAction, orderDataCmSendAction, ordersCmAction} from '../../store/actions/action';

import { OrderCmService } from "../../store/services/ordercm.service";
import { isCurrentOrder, isOrderSendError, isOrderSendCompleted } from "../../store/selectors";
import { OrderCmDataInterface } from "../../interfaces/ordercmdata.interface";
import {OrderCmInterface} from "../../interfaces/ordercm.interface";
import {units} from '../../../../utilmodules/units/units.data';
import { ErrorMessageInterface } from "src/app/shared/interfaces/errMessages.interface";
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
    currentOrderSendCompleted$: Subscription
    currentOrderSendError$: Subscription
    sendBtn: boolean = true

    units = units;

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private modal: NzModalRef,
        private orderService: OrderCmService,
        private toastr: ToastrService
    ){}

    ngOnInit(): void {
        this.store.dispatch(orderDataCmAction({id: this.id}))
        this.initializeSubscription();
    }

    ngOnDestroy(): void{
      this.currentOrderData$.unsubscribe();
      this.currentOrderSendCompleted$.unsubscribe();
      this.currentOrderSendError$.unsubscribe();
    }

    initializeSubscription(){

        this.currentOrderData$ = this.store.pipe(select(isCurrentOrder),  filter(Boolean)).subscribe(
            (item: OrderCmInterface) => this.initializeForm(item)
        )

        this.currentOrderSendError$ = this.store.pipe(select(isOrderSendError),  filter(Boolean)).subscribe(
            (err: ErrorMessageInterface) => {
                this.toastr.error(err.message);
            }
        )

        this.currentOrderSendCompleted$ = this.store.pipe(select(isOrderSendCompleted), filter(Boolean)).subscribe(
            () => {
                this.toastr.success("Заявка успешно отправлена");
                this.store.dispatch(ordersCmAction({}))
                this.modal.close();
            }
        )

    }

    initializeForm(order: OrderCmInterface){

        if(order.status === 1)this.sendBtn = false;

        const disable = (order.status === 1) ? true : false;

        this.formTable = this.fb.group({
            tableRows: this.fb.array(order.orderdata.map(item => {
                //console.log(item)
                return this.fb.group({
                    id: [item.id],
                    articul: [{value: item.articul, disabled: disable}],
                    title: [{value: item.title, disabled: disable}],
                    quantity: [{value: item.quantity, disabled: disable}, [Validators.required, Validators.min(1)]],
                    unit: [{value: item.unit.id, disabled: disable}, [ Validators.required]],
                    description: [{value: item.description, disabled: disable}]
                  })
            }))
        })

    }

    send(){
        //console.log('form data: ', (this.formTable.value.tableRows))
        this.store.dispatch(orderDataCmSendAction({orderdata: this.formTable.value.tableRows}));
        //this.modal.close();
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