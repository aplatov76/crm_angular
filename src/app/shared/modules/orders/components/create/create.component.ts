import {Component, OnInit} from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ClientInterface } from "src/app/shared/interfaces/client.interface";
import {CreateOrderInterface} from '../../interfaces/createOrder.interface'
import { OrdersService } from "../../store/services/orders.service";
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'create-order',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateOrderComponent implements OnInit{

    formData: FormGroup
    formClient: FormGroup
    createOrder: CreateOrderInterface = {client: null, orderData: null}
    clients$: Observable<ClientInterface[]>
    currentSum: null

    constructor(
        private fb: FormBuilder,
        private ordersService: OrdersService
    ){

    }

    ngOnInit(){
        this.initializeSubscription();
        this.initializeForms();
    }

    initializeForms(){

        this.formData = this.fb.group({
            title: ['', Validators.required],
            quantity: [1, Validators.min(1)],
            price: [null, Validators.min(1)],
            sum: [{value: 0, disabled: true}, Validators.min(1)]
        })

    }

    initializeSubscription(){

        this.clients$ = this.ordersService.getClients();
    }

    saleDispatch(){

    }

    deletItemCurrentSales(){

    }

    submit(){

    }

    onClient($event: ClientInterface){

        console.log($event);

        this.formClient = this.fb.group({
            id: [$event.id, Validators.required],
            fullname: [{value: $event.fullname, disabled: true}, Validators.required],
            phone: [{value: $event.phone, disabled: true}, Validators.required]
        })
        
    }
}