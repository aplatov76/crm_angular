import {Component, OnInit} from "@angular/core"
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ClientInterface } from "src/app/shared/interfaces/client.interface";
import {CreateOrderInterface} from '../../interfaces/createOrder.interface'
import { OrdersService } from "../../store/services/orders.service";
import { ToastrService } from 'ngx-toastr';
import { Store } from "@ngrx/store";
import { addOrderAction } from "../../store/actions/action";
import { PersistanceService } from "src/app/shared/services/persistence.service";
import { NzModalRef } from 'ng-zorro-antd/modal';

import {units} from '../../../../utilmodules/units/units.data';

@Component({
    selector: 'create-order',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateOrderComponent implements OnInit{

    formData: FormGroup
    formClient: FormGroup
    formPayed: FormGroup
    formTable: FormGroup
    createOrder = {clientId: null, total: null, current: null, ordertocm: null}
    clients$: Observable<ClientInterface[]>

    units = units;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private ordersService: OrdersService, 
        private toastr: ToastrService,
        private persistanceService: PersistanceService,
        private modalRef: NzModalRef
    ){

    }

    ngOnInit(){
        this.initializeForms();
        this.initializeSubscription();
        this.initializeLocalStorage();
        this.correctTotal();
    }

    initializeForms(){

        this.formData = this.fb.group({
            title: ['', Validators.required],
            quantity: [1, Validators.min(1)],
            price: [0, Validators.min(1)],
            sum: [{value: 0, disabled: true}, Validators.min(1)]
        })

        this.formPayed = this.fb.group({
            current: [null, [Validators.required]],
            total: [{value: 0, disabled: true}, [Validators.required, Validators.min(1)]],
            ordertocm: [null, [Validators.required]],
        })

    }

    initializeLocalStorage(){

        const orderproducts = this.persistanceService.get('orderdata') || null;

        if(orderproducts !== null){

        this.formTable = this.fb.group({
            tableRows: this.fb.array(orderproducts.map(item => {
                return this.fb.group({
                    title: [{value: item.title, disabled: false}],
                    trade_price: [{value: item.trade_price, disabled: true}],
                    articul: [{value: item.articul, disabled: true}],
                    percent: [item.percent],
                    quantity: [item.quantity, [Validators.required, Validators.min(1)]],
                    price: [item.price, Validators.required],
                    unit: [1, [ Validators.required]],
                    summa: [{value: item.price*item.quantity, disabled: true}],
                    description: ''
                  })
            }))
        })

    }

    }

    initializeSubscription(){
        this.clients$ = this.ordersService.getClients();

    }

    orderDispatch(){

        this.createOrder.current = this.formPayed.controls.current.value;
        this.createOrder.ordertocm = 1*this.formPayed.controls.ordertocm.value;

        //console.log(this.createOrder)

        if(!this.createOrder.clientId){
            this.toastr.error('Клиент не выбран');
            return;
        }

        if(!this.formTable){
            this.toastr.error('Список товаров пуст');
            return;
        }

        if(!this.createOrder.total){
            this.toastr.error('Сумма заказа не указана');
            return;
        }

        if(!this.createOrder.current){
            this.toastr.error('Предоплата не указана');
            return;
        }

        if(!this.createOrder.ordertocm){
            this.toastr.error('Не выбрана опция создания заявки');
            return;
        }

        //console.log({createOrder: {...this.createOrder, products: (<FormArray>this.formTable.get('tableRows')).getRawValue()}})

        this.store.dispatch(addOrderAction({createOrder: {...this.createOrder, products: (<FormArray>this.formTable.get('tableRows')).getRawValue()}}));

        //this.persistanceService.set('orderdata', null);
        this.modalRef.close();
    }

    deletItemCurrentOrder(index: number){

        (<FormArray>this.formTable.get('tableRows')).removeAt(index);

        this.correctTotal()
    }

    submit(){

        if(this.formData.invalid){
            this.toastr.error('Ошибка, позиция не добавлена');
            return;
        }

        if(!this.formTable){
            this.formTable = this.fb.group({
                tableRows: this.fb.array([])
            })
        }

        (<FormArray>this.formTable.get('tableRows')).push(
            this.fb.group({
                //id: [0],
                //articul: [item ? item.articul : null],
                title: [this.formData.value.title, Validators.required],
                quantity: [this.formData.value.quantity, [Validators.required, Validators.min(1)]],
                trade_price: [{value: null, disabled: true}],
                percent: [{value: null, disabled: true}],
                articul: [{value: null, disabled: true}],
                price: [this.formData.value.price, Validators.required],
                unit: [1, [ Validators.required]],
                summa: [{value: this.formData.value.quantity*this.formData.value.price, disabled: true}],
                description: ['']
              })
        )

        this.correctTotal()

    }

    correctTotal(){

        if(this.formTable){
            this.createOrder.total = this.formTable.value.tableRows.reduce((sum, current) => (sum + current.price*current.quantity), 0);
            this.formPayed.controls.total.setValue(this.createOrder.total);
        }
    }

    onInput(){
        const quantity = this.formData.controls.quantity.value
        const price = this.formData.controls.price.value
        this.formData.controls.sum.setValue(quantity*price)
        this.correctTotal()
    }

    onInputPercent(index: number){
        const percent = (<FormArray>this.formTable.get('tableRows')).controls[index].get('percent').value;
        const quantity = (<FormArray>this.formTable.get('tableRows')).controls[index].get('quantity').value;
        const trade_price = (<FormArray>this.formTable.get('tableRows')).controls[index].get('trade_price').value;

        if(percent && quantity && trade_price){

            (<FormArray>this.formTable.get('tableRows')).controls[index].get('price').setValue(percent*trade_price);
            (<FormArray>this.formTable.get('tableRows')).controls[index].get('summa').setValue(quantity*percent*trade_price);
            this.correctTotal()
        }

    }

    onInputPrice(index: number){
        const trade_price = (<FormArray>this.formTable.get('tableRows')).controls[index].get('trade_price').value;
        const quantity = (<FormArray>this.formTable.get('tableRows')).controls[index].get('quantity').value;
        const price = (<FormArray>this.formTable.get('tableRows')).controls[index].get('price').value;

        if(price && quantity && price){

            (<FormArray>this.formTable.get('tableRows')).controls[index].get('percent').setValue(price/trade_price);
            (<FormArray>this.formTable.get('tableRows')).controls[index].get('summa').setValue(quantity*price);
            this.correctTotal()
        }

    }

    
    saveToLocalStorage(){
        this.persistanceService.set('orderdata', (<FormArray>this.formTable.get('tableRows')).controls.map(item => ({
            title: item.get('title').value,
            quantity: item.get('quantity').value,
            trade_price: item.get('trade_price').value,
            percent: item.get('percent').value,
            articul: item.get('articul').value,
            price: item.get('price').value,
            unit: item.get('unit').value,
            summa: item.get('summa').value,
            description: item.get('description').value
        })));

        this.toastr.success('Заказ успешно сохранен')
    }

    onClient($event: ClientInterface){

        this.formClient = this.fb.group({
            id: [$event.id, Validators.required],
            fullname: [{value: $event.fullname, disabled: true}, Validators.required],
            phone: [{value: $event.phone, disabled: true}, Validators.required]
        })

        this.createOrder.clientId = $event.id;
    }
}