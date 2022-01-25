import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderInterface } from '../../interfaces/order.interface';
import { ordersAction } from '../../store/actions/action';
import { currentOrders } from '../../store/selectors';
import { CreateOrderComponent } from '../create/create.component';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: OrderInterface[] = null;

  ordersSub: Subscription;

  visible = false;

  data = {
    start: '2018-07-22',
    end: '2020-12-22'
  };

  constructor(
    private store: Store,
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ordersAction());
    this.initializeListener();
  }

  initializeListener(): void {
    this.ordersSub = this.store
      .pipe(select(currentOrders), filter(Boolean))
      .subscribe((items: OrderInterface[]) => {
        this.orders = items;
      });
  }

  setDataStart(e, index: number) {
    if (index === 0) this.data.start = e.target.value;
    if (index === 1) this.data.end = e.target.value;
  }

  filterOrders() {
    this.orders = this.orders.filter(
      (item) =>
        new Date(item.data) >= new Date(this.data.start) &&
        new Date(item.data) <= new Date(this.data.end)
    );
  }

  showModal() {
    this.modalService.create({
      nzTitle: 'Cоздание нового заказа',
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzFooter: [],
      nzStyle: { width: '85%' },
      nzAutofocus: null,
      nzContent: CreateOrderComponent
    });
  }
}
