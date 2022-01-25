import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { ErrorMessageInterface } from '../../../../interfaces/errMessages.interface';
import { currentError, currentOrder } from '../../store/selectors';
import {
  orderAction,
  orderPayAction
} from '../../store/actions/action';
import { OrderInterface } from '../../interfaces/order.interface';
import { orderInsertAction } from '../../../ordercm/store/actions/action';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'order-item',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderItemComponent implements OnInit, OnDestroy {
  currentOrder$: Observable<OrderInterface>;

  currentOrderError$: Subscription;

  createCmOrder$: Subscription;

  id: number;

  isVisibleModal = false;

  sum: number = 0;

  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.store.dispatch(orderAction({ id: this.id }));

    this.initializeListener();
  }

  ngOnDestroy() {
    this.currentOrderError$.unsubscribe();
    if (this.createCmOrder$) this.createCmOrder$.unsubscribe();
  }

  initializeListener(): void {
    this.currentOrder$ = this.store.pipe(select(currentOrder));

    this.currentOrderError$ = this.store
      .pipe(select(currentError), filter(Boolean))
      .subscribe((err: ErrorMessageInterface) => {
        this.toastService.error(err.message);
      });
  }

  getId(id: number) {
    this.store.dispatch(orderAction({ id }));
  }

  handleOk() {
    this.store.dispatch(
      orderPayAction({ id: this.id, sum: this.sum })
    );
    this.isVisibleModal = false;
  }

  createCmOrder() {
    this.createCmOrder$ = this.currentOrder$
      .pipe()
      .subscribe((order) => {
        const orderdata = order[0].orderproduct.map((item) => ({
          ...item,
          id: null
        }));
        this.store.dispatch(orderInsertAction({ orderdata }));
        this.toastService.success('Заявка создана');
      });
  }

  createPDF() {
    const order = {} as any;
    let sum = 0;

    this.currentOrder$
      .pipe(map((item) => item[0]))
      .subscribe((vl) => Object.assign(order, vl))
      .unsubscribe();

    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        {
          text: `Заказ № ${this.id} от ${this.datepipe.transform(
            order.data,
            'yyyy-MM-dd'
          )}`,
          style: 'header'
        },
        '____________________________________________________________________________________________________________________________',
        {
          text: [
            { text: 'Заказчик: ', bold: true },
            { text: `${order.client.fullname}` }
          ]
        },
        {
          text: [
            { text: 'Cумма: ', bold: true },
            { text: order.total.toFixed(2) }
          ]
        },
        {
          text: [
            { text: 'Предоплата: ', bold: true },
            { text: order.current.toFixed(2) }
          ]
        },
        '____________________________________________________________________________________________________________________________',
        { text: 'Перечь товаров:', style: 'h6' },
        {
          style: 'tableExample',

          table: {
            widths: [20, 500, '*', '*', '*'],
            body: [
              [
                { text: '№', bold: true },
                { text: 'Наименование', bold: true },
                { text: 'Кол-во', bold: true },
                { text: 'Цена', bold: true },
                { text: 'Cумма', bold: true }
              ],
              ...order.orderproduct.map((item, index) => [
                index + 1,
                item.title,
                item.quantity,
                item.price.toFixed(2),
                item.sum.toFixed(2)
              ])
            ]
          }
        },
        { text: 'Оплата:', style: 'h6' },
        {
          style: 'tableExample',

          table: {
            widths: ['auto', 200, 200, 200, '*'],
            body: [
              [
                { text: '№', bold: true },
                { text: 'Внесено: ', bold: true },
                { text: 'Остаток: ', bold: true },
                { text: 'Дата: ', bold: true },
                { text: 'Подпись', bold: true }
              ],
              ...order.orderpay.map((item, index) => {
                sum += item.payed;

                return [
                  index + 1,
                  item.payed.toFixed(2),
                  (order.total - sum).toFixed(2),
                  this.datepipe.transform(
                    item.data,
                    'yyyy-MM-dd hh:mm'
                  ),
                  ''
                ];
              })
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        h6: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          width: '100%'
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {}
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
