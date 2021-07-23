import { DatePipe } from '@angular/common';
import {Component, TemplateRef, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs/operators';
import { ReturnSalesInterface } from '../../interfaces/returnSales.interface';
import { returnSalesAction } from '../../store/actions/actions';
import { isReturnSalesSelector } from '../../store/selectors';
import { praisAction } from '../../../../utilmodules/prais/store/actions/action';
import {currentDataSelector as currentPraisSelector} from '../../../../utilmodules/prais/store/selectors';
import {PraisInterface} from '../../../../interfaces/prais.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'return-sales',
    templateUrl: './returnSales.component.html',
    styleUrls: ['./returnSales.component.css']
})
export class ReturnSalesComponent implements OnInit{

    returnSales$: Observable<ReturnSalesInterface[]>
    dt: Date = new Date()
    daterangepickerModel: Date[];
    isCollapsed: boolean = true
    praisList$: Observable<PraisInterface[]>

    modalRef: BsModalRef; 

    constructor(private store: Store, private toastservice: ToastrService, private modalService: BsModalService, private datepipe: DatePipe){

    }

    ngOnInit(): void{

        this.dispatchData(this.dt, this.dt);
        this.store.dispatch(praisAction())

        this.praisList$ = this.store.pipe(select(currentPraisSelector));
                                    

        //this.initializeSubscription();
    }

    dispatchData(databegin: Date, dataend: Date): void{
        this.store.dispatch(returnSalesAction({databegin: this.datepipe.transform(databegin, 'yyyy-mm-dd'), dataend: this.datepipe.transform(dataend, 'yyyy-mm-dd')}));

    }

    getDataWithDate(): void{

        if(!this.daterangepickerModel){
            this.toastservice.error('Не указан период');
            return;
        }

        this.store.dispatch(returnSalesAction({databegin: this.datepipe.transform(this.daterangepickerModel[0], 'yyyy-MM-dd'), dataend: this.datepipe.transform(this.daterangepickerModel[1], 'yyyy-MM-dd')}))
        /**Если повторно не перезаписать observable, то после фильтрации будет баг т.к. в onChange observable перезаписывается */
        this.initializeSubscription()
    }

    initializeSubscription(): void{

        console.log('initialize')

        /**Чтоб фильтровать по title выставляя флаг visible в true|false */
        this.returnSales$ = this.store.pipe(
            select(isReturnSalesSelector), 
            filter(Boolean),
            map((items: ReturnSalesInterface[]) => {
                //console.log(items)
                return items.map(item => ({...item, visible: true}))
            }
        ))


    }

    onChange(target) {

        console.log(target)
        this.returnSales$ = this.returnSales$.pipe(
            map((items: ReturnSalesInterface[]) => 
                    items.map((item: ReturnSalesInterface) => 
                                {
                                    //console.log(item)
                                    //console.log((item.sale.product.id === target.id))
                                    //console.log('map: ', ((item.sale.product.id === target.id) ? ({...item, visible: true}) : ({...item, visible: false})))
                                    return ((item.sale.product.id === target.id) ? ({...item, visible: true}) : ({...item, visible: false}))
                                }
                    ))
        )

       //console.log(co$)
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    }
    
}