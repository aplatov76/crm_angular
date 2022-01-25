import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import pdfMake from 'pdfmake/build/pdfmake';
import { DebtorInterface } from '../../interfaces/debtor.interface';
import {
  debtorAction,
  debtorPayAction
} from '../../store/actions/actions';
import { currentDebtor } from '../../store/selectors';

import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'debtor-component',
  templateUrl: './debtor.component.html'
})
export class DebtorComponent implements OnInit {
  currentDebtor$: Observable<DebtorInterface>;

  isVisibleModal: boolean = false;

  sum: number = 0;

  id: number;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.store.dispatch(debtorAction({ id: this.id }));
    this.initializeSubscription();
  }

  initializeSubscription(): void {
    this.currentDebtor$ = this.store.pipe(select(currentDebtor));
  }

  handleOk() {
    this.store.dispatch(
      debtorPayAction({ id: this.id, sum: this.sum })
    );
    this.isVisibleModal = false;
  }

  openSelectedDebtor(id: number): void {
    this.modalService.create({
      nzTitle: 'Добавить товар',
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        id
      },
      nzFooter: [],
      nzStyle: { width: '80%' },
      nzAutofocus: null,
      nzContent: UpdateComponent
    });
  }

  createPDF() {
    const order = {} as any;
    let sum = 0;

    this.currentDebtor$
      .pipe(map((item) => item))
      .subscribe((vl) => Object.assign(order, vl))
      .unsubscribe();

    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        {
          text: `Товарный чек № ${
            this.id
          } от ${this.datepipe.transform(order.data, 'yyyy-MM-dd')}`,
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
            { text: 'Оплачено: ', bold: true },
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
              ...order.debtorsdata.map((item, index) => [
                index + 1,
                item.product.title,
                item.quantity,
                item.price.toFixed(2),
                (item.quantity * item.price).toFixed(2)
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
              ...order.debtorpayed.map((item, index) => {
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

  createPDFDoc() {
    const order = {} as any;

    this.currentDebtor$
      .pipe(map((item) => item))
      .subscribe((vl) => Object.assign(order, vl))
      .unsubscribe();

    let endData = new Date(order.data);

    endData = new Date(endData.setMonth(endData.getMonth() + 2));

    const docDefinition = {
      content: [
        {
          text: `Договор купли-продажи с рассрочкой платежа № ${
            this.id
          } от ${this.datepipe.transform(order.data, 'yyyy-MM-dd')}`,
          style: 'header'
        },
        {
          text: '_____________________________________________________________________________________________',
          style: 'line'
        },
        {
          text: `Индивидуальный предприниматель Платов Ю.В. ИНН290900038458 государственный регистрационный номер 304290529200029, именуемый далее Продавец, с одной стороны и ${
            order.client.fullname
          }, паспорт: ${
            order.client.passport_number
          } выдан ${this.datepipe.transform(
            order.client.passport_data,
            'yyyy-MM-dd'
          )} , зарегистрированный(ая) по адресу : ${
            order.client.register_address
          } именуемый(ая) далее Покупатель с другой стороны , заключили настоящий договор о нижеследующем.`,
          style: 'text'
        },
        {
          text: `Покупатель приобрел товар согласно перечня в товарном чеке №: ${
            order.id
          } от ${this.datepipe.transform(
            order.data,
            'yyyy-MM-dd'
          )} с рассрочкой платежа на срок до: ${this.datepipe.transform(
            endData,
            'yyyy-MM-dd'
          )} по розничной цене на сумму ${order.total} руб.`,
          style: 'text'
        },
        {
          text: `Внесено наличными при получении товара в сумме: ${order.current} руб.`,
          style: 'text'
        },
        {
          text: `Остаточную сумму: ${
            order.current
          } руб., Покупатель обязуется оплатить Продавцу, предоставившему рассрочку платежа для покупки товаров , до ${this.datepipe.transform(
            endData,
            'yyyy-MM-dd'
          )}. Остаточную сумму Покупатель обязуется внести наличными деньгами в кассу Продавца, согласно графика погашения задолженности не позднее чем ${this.datepipe.transform(
            endData,
            'yyyy-MM-dd'
          )}.`,
          style: 'text'
        },
        {
          text: 'Если Покупателем будет нарушен график погашения задолженности, Продавец вправе потребовать досроч­ного погашения рассрочки в принудительном порядке через суд.',
          style: 'text'
        },
        {
          text: 'Если Покупателем будет допущена просрочка оплаты оставшейся суммы , вся сумма непогашенной задол­женности, а также пени в размере одного процента от просроченной суммы за каждый день просрочки могут быть взысканы с него в принудительном порядке через суд.',
          style: 'text'
        },
        {
          text: 'Реквизиты сторон:',
          style: 'subheader'
        },
        {
          text: 'Продавец : ИП Платов Юрий Витальевич ИНН 290900038458, ОГРНИП: 304290529200029.',
          style: 'text'
        },
        {
          text: `Покупатель ${order.client.fullname}, паспорт: ${order.client.passport_number}`,
          style: 'text'
        },
        {
          text: `Зарегистрированный(ая) по адресу : ${order.client.register_address}`,
          style: 'text'
        },
        {
          text: `Адрес фактического проживания : ${order.client.residence_address}`,
          style: 'text'
        },
        {
          text: `Покупатель: ________________, ${
            order.client.fullname
          }, дата: ${this.datepipe.transform(
            order.data,
            'yyyy-MM-dd'
          )} г.`,
          style: 'text'
        },
        {
          text: `Продавец : __________________, Платов Юрий Витальевич, дата:  ${this.datepipe.transform(
            order.data,
            'yyyy-MM-dd'
          )} г.`,
          style: 'text'
        }
      ],
      styles: {
        header: {
          fontSize: 15,
          bold: true
        },
        line: {
          margin: [0, 0, 0, 10]
        },
        text: {
          fontSize: 12,
          margin: [0, 10, 0, 0],
          alignment: 'justify'
        },
        subheader: {
          margin: [0, 10, 0, 0],
          fontSize: 13,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
