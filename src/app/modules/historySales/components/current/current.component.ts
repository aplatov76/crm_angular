import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import pdfMake from 'pdfmake/build/pdfmake';
import { DatePipe } from '@angular/common';
import { SalesService } from '../../../sales/store/services/sales.service';
import { SalesInterface } from '../../../sales/interfaces/sales.interface';

@Component({
  selector: 'current-historysales-component',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentHistorySalesComponent
  implements OnInit, OnDestroy
{
  @Input('id') id: number;

  current: SalesInterface[];

  total: number;

  currentSub: Subscription;

  constructor(
    private salesService: SalesService,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.currentSub = this.salesService
      .getCheck(this.id)
      .subscribe((item) => {
        this.current = item;
        this.total = item.reduce(
          (sum, current) => sum + current.price * current.quantity,
          0
        );
      });
  }

  ngOnDestroy() {
    this.currentSub.unsubscribe();
  }

  print() {
    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        {
          text: `Товарный чек № ${
            this.current[0].check.id
          } от ${this.datepipe.transform(
            this.current[0].check.data,
            'yyyy-MM-dd'
          )}`,
          style: 'header'
        },
        '____________________________________________________________________________________________________________________________',
        { text: 'Адрес склада: д. Воронцово ул. Профсоюзная 4б' },
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
              ...this.current.map((item, index) => [
                index + 1,
                item.product.title,
                item.quantity,
                item.price.toFixed(2),
                item.sum.toFixed(2)
              ]),
              ['', '', '', 'Итого: ', this.total.toFixed(2)]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 15,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        h6: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          width: '100%'
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black'
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
