import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Data } from '@angular/router';
import { SalesInterface } from '../../../sales/interfaces/sales.interface';
import { SalesService } from '../../../sales/store/services/sales.service';
import { CurrentHistorySalesComponent } from '../current/current.component';
import { PraisInterface } from '../../../../interfaces/prais.interface';
import { currentDataSelector as currentPraisSelector } from '../../../../utilmodules/prais/store/selectors';
import { praisAction } from '../../../../utilmodules/prais/store/actions/action';

@Component({
  selector: 'history-sales',
  templateUrl: './historySales.component.html',
  styleUrls: ['historySales.component.css']
})
export class HistorySalesComponent implements OnInit {
  constructor(
    private salesService: SalesService,
    private store: Store,
    private datepipe: DatePipe,
    private viewContainerRef: ViewContainerRef,
    private modalService: NzModalService
  ) {}

  visible = false;

  dt: Date = new Date();

  dateFormat = 'yyyy-MM-dd';

  daterangepickerModel: Date[] = [];

  sales$: Observable<SalesInterface[]>;

  praisList$: Observable<PraisInterface[]>;

  ngOnInit(): void {
    this.store.dispatch(praisAction());
    this.initializeSubscription();
  }

  initializeSubscription(): void {
    this.praisList$ = this.store.pipe(select(currentPraisSelector));
  }

  getSales() {
    this.sales$ = this.salesService.getSales(
      this.datepipe.transform(
        this.daterangepickerModel[0],
        'yyyy-MM-dd'
      ),
      this.datepipe.transform(
        this.daterangepickerModel[1],
        'yyyy-MM-dd'
      )
    );
  }

  onChange(target) {
    this.sales$ = this.salesService.getSales(
      this.datepipe.transform(
        this.daterangepickerModel[0],
        'yyyy-MM-dd'
      ),
      this.datepipe.transform(
        this.daterangepickerModel[1],
        'yyyy-MM-dd'
      ),
      target.id
    );
  }

  showModal(id: number, data: Data) {
    this.modalService.create({
      nzTitle: `Чек № ${id} от ${data}`,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        id
      },
      nzFooter: [],
      nzStyle: { width: '80%' },
      nzAutofocus: null,
      nzContent: CurrentHistorySalesComponent
    });
  }
}
