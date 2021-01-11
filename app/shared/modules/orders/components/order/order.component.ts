import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { OrderInterface } from '../../interfaces/order.interface';
import {State, Store, select} from '@ngrx/store'
import { ordersAction, ordersIdAction } from '../../store/actions/action';
import { currentOrders, currentOrder } from '../../store/selectors';
import { ActivatedRoute } from "@angular/router";

import {OrderProductsListInterface} from '../../interfaces/orderProducts.interface';

@Component({
    selector: 'order-item',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderItemComponent implements OnInit{

    //orders$: Observable<OrderInterface[]>
    currentOrder$: Observable<OrderProductsListInterface>
    id: number

    constructor(private store: Store, private route: ActivatedRoute){

    }

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.store.dispatch(ordersIdAction({id: this.id}));

        this.initializeListener();

    }

    initializeListener(): void{
        //this.orders$ = this.store.pipe(select(currentOrders))
        this.currentOrder$ = this.store.pipe(select(currentOrder))
    }


    getId(id: number){
        this.store.dispatch(ordersIdAction({id: id}))
    }
    
}