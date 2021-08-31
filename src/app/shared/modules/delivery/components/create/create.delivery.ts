import { DatePipe } from '@angular/common';
import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ClientInterface } from 'src/app/shared/interfaces/client.interface';
import { ClientService } from '../../../clients/store/services/clients.service';

import {DeliveryInterface} from '../../interfaces/delivery.interface';
import { CheckInterface } from "src/app/shared/interfaces/check.interface";
import { DeliveryService } from '../../store/services/delivery.service';


@Component({
    selector: 'create-delivery.component',
    templateUrl: './create.template.html',
    styleUrls: ['./create.delivery.css']
})
export class CreateDeliveryComponent{


    form: FormGroup
    clients$: Observable<ClientInterface[]>
    checks$: Observable<CheckInterface[]>
    checks: CheckInterface[]

    constructor(
        private datepipe: DatePipe,
        private store: Store,
        private fb: FormBuilder,
        private clientService: ClientService,
        private deliveryService: DeliveryService
    ){

    }

    nodes = [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
              key: '0-0-1'
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2'
            }
          ]
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1'
        }
      ];

    ngOnInit(): void{
        //this.store.dispatch(client)
        this.clients$ = this.clientService.getClients();

        this.checks$ = this.deliveryService.getChecks().pipe(map((items) => {
            // console.log(item);
            this.checks = items.map((item: any) => ({
                ...item, 
                key: item.id, 
                title: item.id, 
                value: item.id, 
                children: [
                    ...item.sale.map(el => ({
                        id: el.id,
                        key: el.id,
                        title: `${ el.product.title} кол-во: ${el.quantity} цена: ${el.price} руб. сумма: ${el.quantity*el.price} руб.`,//el.quantity
                        isLeaf: true
                    }))
                ]
            }));

            return items.map(item => ({...item, key: item.id, title: item.id, value: item.id, children: []}))
        }));
    }

    setClient(event$){


        console.log(event$);
        this.initializeForm(event$.id);

    }


    initializeForm(item: ClientInterface){

        this.form = this.fb.group({
            idclient: [item.id],
            idcheck: [null],
            data: [null, Validators.required],
            price: [350, Validators.required],
            description: [''],
            status: [0]
        })

    }

}