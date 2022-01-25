import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { isCurrentOrderDataCount } from '../../modules/ordercm/store/selectors';
import { isWarningProducts } from '../../modules/products/store/selectors';
import { OrderCmInterface } from '../../modules/ordercm/interfaces/ordercm.interface';
import { productsWarningAction } from '../../modules/products/store/actions/action';
import { ProductInterface } from '../../interfaces/product.interface';

@Component({
  selector: 'app-indicator',
  templateUrl: './app-indicator.component.html',
  styleUrls: ['./app-indicator.component.css']
})
export class AppIndicatorComponent implements OnInit {
  orderCmData$: Observable<OrderCmInterface>;

  productWarning$: Observable<ProductInterface[]>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(
      productsWarningAction({ query: { warning: true } })
    );
    this.initializeSubscription();
  }

  initializeSubscription() {
    this.orderCmData$ = this.store.pipe(
      select(isCurrentOrderDataCount)
    );
    this.productWarning$ = this.store.pipe(select(isWarningProducts));
  }

  navigate() {
    this.router.navigate(['products']);
  }
}
