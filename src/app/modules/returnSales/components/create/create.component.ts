import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PraisInterface } from 'src/app/interfaces/prais.interface';
import { currentDataSelector as currentPraisSelector } from '../../../../utilmodules/prais/store/selectors';
import { SalesInterface } from '../../../sales/interfaces/sales.interface';
import { SalesService } from '../../../sales/store/services/sales.service';
import { createReturnSalesAction } from '../../store/actions/actions';
import {
  isCreatedReturnSaleSelector,
  isErrorReturnSalesSelector
} from '../../store/selectors';

@Component({
  selector: 'create-return-sale',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateReturnSaleComponent implements OnInit, OnDestroy {
  praisList$: Observable<PraisInterface[]>;

  selectSales$: Observable<SalesInterface[]>;

  currentCreatedReturnSale$: Subscription;

  errorSubscription: Subscription;

  currentId: number;

  currentData: Date = new Date();

  currentPage: number = 1;

  selectCurrentQuantity: number = 0;

  selectCurrent: SalesInterface;

  constructor(
    private store: Store,
    private salesService: SalesService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.praisList$ = this.store.pipe(select(currentPraisSelector));
    this.currentCreatedReturnSale$ = this.store
      .pipe(select(isCreatedReturnSaleSelector), filter(Boolean))
      .subscribe(() => {
        this.toastService.success(
          `Возврат: ${this.selectCurrent.product.title} успешен`
        );
        this.selectCurrent = null;
        this.selectCurrentQuantity = 0;
      });

    this.errorSubscription = this.store
      .pipe(select(isErrorReturnSalesSelector), filter(Boolean))
      .subscribe((err: any) =>
        this.toastService.error(
          `Произошла ошибка ${err.error.message}`
        )
      );
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.currentCreatedReturnSale$.unsubscribe();
  }

  onChange($target: any): void {
    this.currentId = $target.id;
    this.getSalesInPeriod();
  }

  pageChanged($target): void {
    this.currentPage = $target;
    this.getSalesInPeriod();
  }

  getSalesInPeriod(): void {
    const index = this.currentPage === 1 ? 0 : this.currentPage;

    const dataEnd = new Date();
    dataEnd.setDate(this.currentData.getDate() - 7 * index);
    const dataBegin = new Date();
    dataBegin.setDate(this.currentData.getDate() - 7 * index - 14);

    this.selectSales$ = this.salesService.getSales(
      dataBegin.toISOString().slice(0, 10),
      dataEnd.toISOString().slice(0, 10),
      this.currentId,
      'desc'
    );
  }

  onClickSelectCurrent(element: SalesInterface): void {
    this.selectCurrent = element;
  }

  createReturnSale(): void {
    this.store.dispatch(
      createReturnSalesAction({
        returnsale: {
          id: this.selectCurrent.id,
          quantity: this.selectCurrentQuantity
        }
      })
    );
  }
}
