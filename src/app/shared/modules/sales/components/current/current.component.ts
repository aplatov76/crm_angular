import {Component, TemplateRef, OnInit, OnDestroy} from '@angular/core';

import { Observable, Subscribable, Subscription } from 'rxjs';
import {Store, select} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DatePipe } from '@angular/common';

import { ClientService } from '../../../clients/store/services/clients.service';
import { salesAction, addSaleAction } from '../../store/actions/action';
import {isLoadingSelector, isSubmittingSelector, currentSalesSelector, currentError, currentSaleCompleted } from '../../store/selectors';
import {currentDataSelector as currentPraisSelector, currentProductSelector} from '../../../../utilmodules/prais/store/selectors';
import {CurrentSaleInterface} from '../../interfaces/currentSale.interface';
import { PraisInterface } from '../../../../interfaces/prais.interface';
import { praisAction, productAction } from '../../../../utilmodules/prais/store/actions/action';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { ClientInterface } from 'src/app/shared/interfaces/client.interface';
import { filter } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CheckInterface } from 'src/app/shared/interfaces/check.interface';
import { SalesInterface } from '../../interfaces/sales.interface';


@Component({
    selector: 'current-sale',
    templateUrl: './current.template.html',
    styleUrls: ['./current.component.css']
})
export class CurrentSaleComponent{

    errorSubscription : Subscription
    subCompleted: Subscription
    currentSum: number =  0
    delivery: boolean = false
    printcheck: boolean = false
    
    isLoading$ : Observable<boolean>
    clients$: Observable<ClientInterface[]>
    praisList$: Observable<PraisInterface[]>

    isType: number = 0
    currentSale: CurrentSaleInterface[] = []
    isCurrentProduct: ProductInterface
    isCurrentProduct$: Subscription
    praisList: PraisInterface[] = null

    form: FormGroup
    deliveryForm: FormGroup

    constructor(private store: Store, private clientService: ClientService, private fb: FormBuilder,  private toastr: ToastrService, public modal: NzModalRef, private datepipe: DatePipe){

    }

    ngOnInit(): void {

        this.store.dispatch(praisAction())

        this.initializeListeners()
        
    }


    ngOnDestroy(): void {
        this.isCurrentProduct$.unsubscribe()
        this.errorSubscription.unsubscribe()
    }

    initializeListeners(): void{

        this.praisList$ = this.store.pipe(select(currentPraisSelector));
        this.clients$ = this.clientService.getClients();
    
        this.isCurrentProduct$ = this.store.pipe(select(currentProductSelector), filter(Boolean))
            .subscribe((res: ProductInterface[]) => {
                //console.log('Загрузка позиции: ', res)
                if(res){
                    this.isCurrentProduct = res[0];
                    this.initializeForm()
                }
        })

        this.errorSubscription = this.store.pipe(select(currentError), filter(Boolean)).subscribe((res: any) => this.toastr.error(`Произошла ошибка ${res.error.message}`));

        this.subCompleted = this.store.pipe(select(currentSaleCompleted), filter(Boolean))
        .subscribe((res: SalesInterface[]) => {

                if(this.printcheck)this.createCheck(res)
                this.currentSale = [];
                this.currentSum = 0;
                this.modal.close();
    })


    }

    initializeForm(){

        this.form = this.fb.group({
            id: [this.isCurrentProduct.id, [Validators.required]],
            stock: [{value: this.isCurrentProduct.stock, disabled: true}, [Validators.required]],
            price: [{value: this.isCurrentProduct.price, disabled: true}, [Validators.required]],
            quantity: [1, [Validators.required, Validators.min(1), Validators.max(this.isCurrentProduct.stock)]],
            sum: [{value: this.isCurrentProduct.price, disabled: true}, [Validators.required]]
        })
    }

    initializeDeliveryForm(client: ClientInterface){

        this.deliveryForm = this.fb.group({
            residence_address: [{value: client.residence_address, disabled: true}, [Validators.required]],
            clientid: [client.id, Validators.required],
            phone: [{value: client.phone, disabled: true}, [Validators.required]],
            data: [null, [Validators.required]],
            price: [350, Validators.required],
            description: ['', Validators.required],
        })

    }

    onInput(){
        const quantity = this.form.controls.quantity.value
        const price = this.form.controls.price.value
        this.form.controls.sum.setValue(quantity*price)
    }

    /**Запрос выбранной позиции на сервер, т.к. количество на складе и цена могут отличаться от загруженных ранее */
    onChange(target) {

        this.store.dispatch(productAction({id: target.id}))
    }

    submit(){

       const searchDublicate =  this.currentSale.find(res => res.id === this.isCurrentProduct.id) || null

       if(searchDublicate){

           this.toastr.warning(`"${this.isCurrentProduct.title}" уже есть в списке`);
       }
       if(this.form.controls.quantity.invalid){
           this.toastr.error(`"${this.isCurrentProduct.title}" недостаточно на складе!`);
       }

       if(!this.form.invalid && searchDublicate === null){
            this.currentSale.push({
                id: this.isCurrentProduct.id,
                quantity: this.form.controls.quantity.value,
                price: this.isCurrentProduct.price,
                title: this.isCurrentProduct.title
            });

            this.currentSum += this.isCurrentProduct.price*this.form.controls.quantity.value;
            this.toastr.success(`"${this.isCurrentProduct.title}" добавлено в текущую продажу`);
        }
    }

    deletItemCurrentSales(id){
        const currentItem = this.currentSale.find(el => el.id === id);

        this.currentSum -= currentItem.price*currentItem.quantity;

        this.currentSale = this.currentSale.filter(el => el.id != id);

    }

    currentSaleClose(): void{

    }

    saleDispatch(){
        this.store.dispatch(addSaleAction({
            sale: this.currentSale, 
            delivery: (this.delivery && this.deliveryForm) ? this.deliveryForm.value : null
        }));
        
        this.currentSaleClose();
    }

    validateDelivery(): boolean{
        if(this.delivery){
            if(!this.deliveryForm)return true;
            if(this.deliveryForm.invalid)return true;

        }
        else return false;
    }

    setClient($event){

        this.initializeDeliveryForm($event)
    }

    createCheck(createdSales: SalesInterface[]){


         let docDefinition = {
             pageOrientation: 'landscape',
             content: [
                 
                 {text: `Товарный чек № ${createdSales[0].check.id} от ${this.datepipe.transform(createdSales[0].check.data, 'yyyy-MM-dd')}`, style: 'header' },
                 '____________________________________________________________________________________________________________________________',
                 {text: 'Адрес склада: д. Воронцово ул. Профсоюзная 4б'},
                 '____________________________________________________________________________________________________________________________',
                 {text: `Перечь товаров:`, style: 'h6' },
                 {
                     style: 'tableExample',
 
                     table: {
                         widths: [20, 500, '*', '*', '*'],
                         body: [
                             [{text: '№', bold: true}, {text: 'Наименование', bold: true} , {text: 'Кол-во', bold: true}, {text: 'Цена', bold: true}, {text: 'Cумма', bold: true}],
                             ...createdSales.map((item, index) => [index+1, item.product.title, item.quantity, item.price.toFixed(2), item.sum.toFixed(2)]),
                             ['', '', '', 'Итого: ', this.currentSum.toFixed(2)]
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
          
           pdfMake.createPdf(docDefinition).open()
    }
}