import {Component, OnInit, Input} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import {closeDeliveryAction, deliveryAction} from '../../store/actions/actions';
import {DeliveryInterface} from '../../interfaces/delivery.interface';
import {currentDelivery} from '../../store/selectors';
import { ActivatedRoute } from '@angular/router';
import { SalesInterface } from '../../../sales/interfaces/sales.interface';

@Component({
    selector: 'currentdelivery-component',
    templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit{

    id: number
    status: number = 0
    sale: SalesInterface[]
    form: FormGroup
    currentDelivery: Subscription

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private datepipe: DatePipe,
        private toastservice: ToastrService, 
    ){

    }

    ngOnInit(){
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.store.dispatch(deliveryAction({id: this.id}))

        //this.initializeForm();
        this.initializeSubscription();

    }

    ngOnDestroy(): void{
        if(this.currentDelivery)this.currentDelivery.unsubscribe();
    }


    initializeSubscription(){

      
        this.currentDelivery = this.store.pipe(select(currentDelivery), filter(Boolean)).subscribe((item: DeliveryInterface) => {
            this.initializeForm(item[0])
            this.status = item[0].status;
            this.sale = item[0].check.sale;
        })

    }

    closeDelivery(){

        this.store.dispatch(closeDeliveryAction({id: this.id}))
        this.toastservice.success('Доставка закрыта');
       /// this.store

    }

    initializeForm(item: DeliveryInterface){

        this.form = this.fb.group({
            id: [item.id, Validators.required],
            data: [this.datepipe.transform(item.data, 'yyyy-MM-dd'), Validators.required],
            address: [item.client.residence_address],
            description: [item.description],
            price: [item.price],
            client: [item.client.fullname],
            status: [{value: (item.status === 0) ? 'Открыта' : 'Закрыта'}]
        })

    }

}