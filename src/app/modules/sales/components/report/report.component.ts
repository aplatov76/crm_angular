import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { forkJoin, Subscription } from 'rxjs';

import { DatePipe } from '@angular/common';
import { SalesInterface } from '../../interfaces/sales.interface';

import { SalesService } from '../../store/services/sales.service';
import { CassaValueInterface } from '../../interfaces/cassaValue.interface';
import { ReturnSalesService } from '../../../returnSales/store/services/returnSales.service';
import { ReturnSalesInterface } from '../../../returnSales/interfaces/returnSales.interface';
import { OrderInterface } from '../../../orders/interfaces/order.interface';
import { DebtorInterface } from '../../../debtors/interfaces/debtor.interface';

@Component({
  selector: 'report-sales',
  templateUrl: 'report.component.html'
})
export class ReportComponent implements OnInit, OnDestroy {
  @Input('data') data: Date;

  /* Как указать тип возвращаемогbleо обсервабле в forkJoin */
  forkData$: Subscription;

  currentSales: SalesInterface[];

  currentReturnSales: ReturnSalesInterface[];

  currentOrdersPayed: OrderInterface[];

  currentDebtorsPayed: DebtorInterface[];

  currentCassa: CassaValueInterface = { id: 0, data: null, sum: 0 };

  orderPayed: number = 0;

  debtorPayed: number = 0;

  returnsum: number = 0;

  sum: number = 0;

  constructor(
    private salesService: SalesService,
    private returnedSalesService: ReturnSalesService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initializeSubscription();
  }

  ngOnDestroy(): void {
    this.forkData$.unsubscribe();
  }

  initializeSubscription() {
    const currentData = this.datepipe.transform(
      this.data,
      'yyyy-MM-dd'
    );
    this.forkData$ = forkJoin([
      this.salesService.getSales(currentData, currentData),
      this.salesService.getCassaValue(currentData),
      this.returnedSalesService.getReturnSales(),
      this.salesService.getOrdersPayed(currentData, currentData),
      this.salesService.getDebtorPayed(currentData, currentData)
    ]).subscribe(
      ([currentSales, cassa, returnsales, orderspayed, debtorpayed]: [
        SalesInterface[],
        CassaValueInterface,
        ReturnSalesInterface[],
        OrderInterface[],
        DebtorInterface[]
      ]) => {
        this.currentSales = currentSales;
        this.currentReturnSales = returnsales;
        this.currentCassa = cassa || {
          id: 0,
          sum: 0,
          data: new Date()
        };
        this.currentOrdersPayed = orderspayed;
        this.currentDebtorsPayed = debtorpayed;

        this.sum = this.currentSales.reduce(
          (sum, current) => sum + current.price * current.quantity,
          0
        );

        this.returnsum = this.currentReturnSales.reduce(
          (sum, current) =>
            sum + current.sale.price * current.quantity,
          0
        );
        this.orderPayed = this.currentOrdersPayed.reduce(
          (sum, current) =>
            sum +
            current.orderpay.reduce(
              (sum_0, el) => sum_0 + el.payed,
              0
            ),
          0
        );
        this.debtorPayed = this.currentDebtorsPayed.reduce(
          (sum, current) =>
            sum +
            current.debtorpayed.reduce(
              (sum_0, el) => sum_0 + el.payed,
              0
            ),
          0
        );
      }
    );
  }
}
