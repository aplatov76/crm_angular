import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from "ng-zorro-antd/modal";

import { Observable, of, Subject,  Subscription } from "rxjs";

import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import {orderDataCmAction, orderInsertAction, orderDataCmRemoveAction,  orderDataCmSendAction, ordersCmAction} from '../../store/actions/action';
import {currentDataSelector as currentPraisSelector} from '../../../../utilmodules/prais/store/selectors';

import { OrderCmService } from "../../store/services/ordercm.service";
import { isCurrentOrder, isOrderSendError, isOrderSendCompleted } from "../../store/selectors";
import {OrderCmInterface} from "../../interfaces/ordercm.interface";
import {units} from '../../../../utilmodules/units/units.data';
import { ErrorMessageInterface } from "src/app/shared/interfaces/errMessages.interface";
import { PraisInterface } from '../../../../interfaces/prais.interface';
import { praisAction } from '../../../../utilmodules/prais/store/actions/action';

@Component({
    selector: 'current-cm-order-component',
    templateUrl: './current.component.html',
    styleUrls: ['./current.component.css']
})
export class CurrentCmOrderComponent implements OnInit, OnDestroy{

    formTable: FormGroup

    @Input() id: number

    praisList$: Observable<PraisInterface[]>
    currentOrderData$: Subscription
    currentOrderSendCompleted$: Subscription
    currentOrderSendError$: Subscription
    sendBtn: boolean = true

    units = units;

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private modal: NzModalRef,
        private toastr: ToastrService
    ){}

    ngOnInit(): void {

        this.store.dispatch(praisAction())
        this.praisList$ = this.store.pipe(select(currentPraisSelector))

        console.log('id in modal: ', this.id);
        if(this.id){
            this.store.dispatch(orderDataCmAction({id: this.id}))
        } else {
            this.initializeEmptyForm();
        }

        this.initializeSubscription();
        
    }

    ngOnDestroy(): void{

      if(this.currentOrderData$)this.currentOrderData$.unsubscribe();
      if(this.currentOrderSendCompleted$)this.currentOrderSendCompleted$.unsubscribe();
      if(this.currentOrderSendError$)this.currentOrderSendError$.unsubscribe();

    }

    initializeSubscription(){


        this.currentOrderData$ = this.store.pipe(select(isCurrentOrder),  filter(Boolean)).subscribe(
            (item: OrderCmInterface) => {
                if(this.id)this.initializeForm(item);
            }
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

    initializeEmptyForm(){

        this.formTable = this.fb.group({
            tableRows: this.fb.array([])
        })

    }

    send(){
        this.store.dispatch(orderDataCmSendAction({orderdata: this.formTable.value.tableRows}));
    }

    addRow(item?: PraisInterface){
        (<FormArray>this.formTable.get('tableRows')).push(
            this.fb.group({
                id: [0],
                articul: [item ? item.articul : null],
                title: [item ? item.title : ''],
                quantity: [0, [Validators.required, Validators.min(1)]],
                unit: [1, [ Validators.required]],
                description: ['']
              })
        )
    }

    removeRow(id_in_db: number, index: number){
        
        if(id_in_db !== 0)this.store.dispatch(orderDataCmRemoveAction({id: id_in_db}));

        //т.к. не делаею dispatch (он удалит все поля которые добавлены но не отправлены в БД)
        (<FormArray>this.formTable.get('tableRows')).removeAt(index);

        console.log(this.formTable);
    }

    onChange($event){
        
        this.addRow($event)
    }

    save(){
        //console.log(this.formTable.value.tableRows)
        this.store.dispatch(orderInsertAction({orderdata: this.formTable.value.tableRows}));
        this.toastr.info("Заявка успешно сохранена");
        this.modal.close()
    }


    submit(){
      this.modal.close();
    }
    
}