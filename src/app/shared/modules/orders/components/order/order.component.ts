import {Component, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OrderInterface } from '../../interfaces/order.interface';
import {State, Store, select} from '@ngrx/store'
import { ToastrService } from 'ngx-toastr';
import { ordersAction, orderAction, orderPayAction, orderPayActionFailed } from '../../store/actions/action';
import { currentOrders, currentError, currentOrder } from '../../store/selectors';
import { ActivatedRoute } from "@angular/router";

import {OrderProductInterface} from '../../interfaces/orderProduct.interface';
import {ErrorMessageInterface} from '../../../../interfaces/errMessages.interface';
import { filter, map } from 'rxjs/operators';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { DatePipe } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;   


@Component({
    selector: 'order-item',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderItemComponent implements OnInit, OnDestroy{

    //orders$: Observable<OrderInterface[]>
    currentOrder$: Observable<OrderInterface>
    currentOrderError$: Subscription
    id: number

    isVisibleModal = false;
    sum: number = 0

    @ViewChild('htmlData', {static: false}) htmlData: ElementRef;

    constructor(
        private store: Store, 
        private route: ActivatedRoute, 
        private toastService: ToastrService,
        private datepipe: DatePipe){

    }

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.store.dispatch(orderAction({id: this.id}));

        this.initializeListener();

    }

    ngOnDestroy(){
        this.currentOrderError$.unsubscribe();
    }

    initializeListener(): void{
        //this.orders$ = this.store.pipe(select(currentOrders))
        this.currentOrder$ = this.store.pipe(select(currentOrder))

        this.currentOrderError$ = this.store.pipe(select(currentError), filter(Boolean)).subscribe(
            (err: ErrorMessageInterface) => {
                console.log(err.message)
                this.toastService.error(err.message)
            }
        )
    }


    getId(id: number){
        this.store.dispatch(orderAction({id: id}))
    }
    
    handleOk(){
        //console.log(this.sum)
        this.store.dispatch(orderPayAction({id: this.id, sum: this.sum}))
        this.isVisibleModal = false;
    }

    createPDF(){

        /*console.log(this.currentOrder$.subscribe((item: any) => {
            //console.log(item)
            return item[0].orderproduct.map((el, index) => {
                //console.log(el)
                return [
                    index,
                    el.title,
                    el.quantity,
                    el.price,
                    el.sum
                ]
            })
        }))
        */
       const order = {} as any;
       let sum = 0;

        this.currentOrder$.pipe(
            map(item => item[0])
        )
        .subscribe((vl) => Object.assign(order, vl))
        .unsubscribe()



        let docDefinition = {
            pageOrientation: 'landscape',
            content: [
                
                {text: `Заказ № ${this.id} от ${this.datepipe.transform(order.data, 'yyyy-MM-dd')}`, style: 'header' },
                '____________________________________________________________________________________________________________________________',
		        {
                    text: [
                        {text: `Заказчик: `, bold: true}, 
                        {text: `${order.client.fullname}`}
                    ]
                },
                {
                    text: [
                        {text: `Cумма: `, bold: true}, 
                        {text: order.total.toFixed(2)}
                    ]
                },
                {
                    text: [
                        {text: `Предоплата: `, bold: true}, 
                        {text: order.current.toFixed(2)}
                    ]
                },
                '____________________________________________________________________________________________________________________________',
                {text: `Перечь товаров:`, style: 'h6' },
                {
                    style: 'tableExample',

                    table: {
                        widths: [20, 500, '*', '*', '*'],
                        body: [
                            [{text: '№', bold: true}, {text: 'Наименование', bold: true} , {text: 'Кол-во', bold: true}, {text: 'Цена', bold: true}, {text: 'Cумма', bold: true}],
                            ...order.orderproduct.map((item, index) => [index+1, item.title, item.quantity, item.price.toFixed(2), item.sum.toFixed(2)])
                            
                        ]
                    }
                },
                {text: `Оплата:`, style: 'h6' },
                {
                    style: 'tableExample',

                    table: {
                        widths: ['auto', 200, 200, 200, '*'],
                        body: [
                            [{text: `№`, bold: true}, {text: `Внесено: `, bold: true}, {text: `Остаток: `, bold: true}, {text: `Дата: `, bold: true}, {text: `Подпись`, bold: true} ],
                            ...order.orderpay.map((item, index) => {

                                sum = sum + item.payed;

                                return [index+1, item.payed.toFixed(2), (order.total - sum).toFixed(2), this.datepipe.transform(item.data, 'yyyy-MM-dd hh:mm'), '']
                            })
                            
                        ]
                    }
                },
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
            defaultStyle: {
                // alignment: 'justify'
            }
          };  
         
          pdfMake.createPdf(docDefinition).open()

    }

}