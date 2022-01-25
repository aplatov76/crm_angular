import { DatePipe } from '@angular/common';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter, map } from 'rxjs/operators';
import { ReturnSalesInterface } from '../../interfaces/returnSales.interface';
import { returnSalesAction } from '../../store/actions/actions';
import { isReturnSalesSelector } from '../../store/selectors';
import { praisAction } from '../../../../utilmodules/prais/store/actions/action';
import { currentDataSelector as currentPraisSelector } from '../../../../utilmodules/prais/store/selectors';
import { PraisInterface } from '../../../../interfaces/prais.interface';
import { CreateReturnSaleComponent } from '../create/create.component';

@Component({
  selector: 'return-sales',
  templateUrl: './returnSales.component.html',
  styleUrls: ['./returnSales.component.css']
})
export class ReturnSalesComponent implements OnInit {
  returnSales$: Observable<ReturnSalesInterface[]>;

  dt: Date = new Date();

  dateFormat = 'yyyy/MM/dd';

  daterangepickerModel: Date[] = [];

  isCollapsed: boolean = false;

  praisList$: Observable<PraisInterface[]>;

  constructor(
    private store: Store,
    private toastservice: ToastrService,
    private viewContainerRef: ViewContainerRef,
    private modalService: NzModalService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.dispatchData(this.dt, this.dt);
    this.store.dispatch(praisAction());

    this.praisList$ = this.store.pipe(select(currentPraisSelector));
  }

  dispatchData(databegin: Date, dataend: Date): void {
    this.store.dispatch(
      returnSalesAction({
        databegin: this.datepipe.transform(databegin, 'yyyy-mm-dd'),
        dataend: this.datepipe.transform(dataend, 'yyyy-mm-dd')
      })
    );
  }

  getDataWithDate(): void {
    if (this.daterangepickerModel.length < 1) {
      this.toastservice.error('Не указан период');
      return;
    }

    this.store.dispatch(
      returnSalesAction({
        databegin: this.datepipe.transform(
          this.daterangepickerModel[0],
          'yyyy-MM-dd'
        ),
        dataend: this.datepipe.transform(
          this.daterangepickerModel[1],
          'yyyy-MM-dd'
        )
      })
    );
    /** Если повторно не перезаписать observable, то после фильтрации будет баг т.к. в onChange observable перезаписывается */
    this.initializeSubscription();
  }

  initializeSubscription(): void {
    /** Чтоб фильтровать по title выставляя флаг visible в true|false */
    this.returnSales$ = this.store.pipe(
      select(isReturnSalesSelector),
      filter(Boolean),
      map((items: ReturnSalesInterface[]) =>
        // console.log(items)
        items.map((item) => ({ ...item, visible: true }))
      )
    );
  }

  onChange(target) {
    this.returnSales$ = this.returnSales$.pipe(
      map((items: ReturnSalesInterface[]) =>
        items.map((item: ReturnSalesInterface) =>
          item.sale.product.id === target.id
            ? { ...item, visible: true }
            : { ...item, visible: false }
        )
      )
    );
  }

  showModal(title: string) {
    this.modalService.create({
      nzTitle: title,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzFooter: [],
      nzStyle: { width: '80%' },
      nzAutofocus: null,
      nzContent: CreateReturnSaleComponent
    });
  }
}
