import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { ClientInterface } from 'src/app/shared/interfaces/client.interface';
import { CheckInterface } from 'src/app/shared/interfaces/check.interface';
import { ErrorMessageInterface } from 'src/app/shared/interfaces/errMessages.interface';
import { ClientService } from '../../../clients/store/services/clients.service';

import { DeliveryService } from '../../store/services/delivery.service';
import { addDeliveryAction } from '../../store/actions/actions';
import { currentError } from '../../store/selectors';

@Component({
  selector: 'create-delivery.component',
  templateUrl: './create.template.html',
  styleUrls: ['./create.delivery.css']
})
export class CreateDeliveryComponent implements OnInit, OnDestroy {
  form: FormGroup;

  clients$: Observable<ClientInterface[]>;

  checks$: Observable<CheckInterface[]>;

  checks: CheckInterface[];

  errSub$: Subscription;

  constructor(
    private datepipe: DatePipe,
    private store: Store,
    private fb: FormBuilder,
    private clientService: ClientService,
    private deliveryService: DeliveryService,
    private toastr: ToastrService,
    public modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.initializeSubscription();
  }

  ngOnDestroy(): void {
    this.errSub$.unsubscribe();
  }

  initializeSubscription() {
    this.clients$ = this.clientService.getClients();

    this.checks$ = this.deliveryService.getChecks().pipe(
      map((items) => {
        this.checks = items.map((item: any) => ({
          ...item,
          key: item.id,
          title: `id: ${item.id} дата: ${this.datepipe.transform(
            item.data,
            'yyyy-MM-dd HH:mm a'
          )}`,
          children: [
            ...item.sale.map((el) => ({
              id: el.id,
              key: el.id,
              title: `${el.product.title} кол-во: ${
                el.quantity
              } цена: ${el.price} руб. сумма: ${
                el.quantity * el.price
              } руб.`, // el.quantity
              isLeaf: true
            }))
          ]
        }));

        return items;
      })
    );

    this.errSub$ = this.store
      .pipe(select(currentError), filter(Boolean))
      .subscribe((err: ErrorMessageInterface) =>
        this.toastr.error(err.message)
      );
  }

  setClient(event$) {
    this.initializeForm(event$);
  }

  initializeForm(item: ClientInterface) {
    this.form = this.fb.group({
      idclient: [item.id],
      idcheck: [null],
      data: [null, Validators.required],
      price: [350, Validators.required],
      description: [''],
      status: [0]
    });
  }

  submit() {
    this.store.dispatch(
      addDeliveryAction({ createDelivery: this.form.value })
    );
    this.modal.close();
  }
}
