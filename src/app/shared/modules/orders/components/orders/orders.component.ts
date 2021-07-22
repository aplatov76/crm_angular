import {Component, OnInit} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OrderInterface } from '../../interfaces/order.interface';
import {State, Store, select} from '@ngrx/store'
import { ordersAction, ordersIdAction } from '../../store/actions/action';
import { currentOrders, currentOrder } from '../../store/selectors';
import {map, filter} from 'rxjs/operators'

@Component({
    selector: 'orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

    orders: OrderInterface[] = null
    ordersSub: Subscription
    data = {
        start: '2018-07-22',
        end: '2020-12-22'
    }


    constructor(private store: Store){

    }

    ngOnInit(): void {
        this.store.dispatch(ordersAction());
        this.initializeListener();
    }

    initializeListener(): void{

        this.ordersSub = this.store.pipe(select(currentOrders), filter(Boolean))
            .subscribe((items: OrderInterface[])  => this.orders = items)
        //this.orders$ = 
    }

    setDataStart(e, index: number){
        console.log(e.target.value)
        if(index === 0)this.data.start = e.target.value;
        if(index === 1)this.data.end = e.target.value;

    }

    filterOrders(){
        this.orders = this.orders.filter(item => (new Date(item.data) >= new Date(this.data.start) && new Date(item.data) <= new Date(this.data.end)))
        this.orders.map(item => {
            console.log(item.data);
            console.log(this.data.start)
            console.log(this.data.end)
            console.log(new Date(item.data) >= new Date(this.data.start) && new Date(item.data) <= new Date(this.data.end))
        })
    }
    
}