import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { PraisInterface } from 'src/app/interfaces/prais.interface';
import { praisAction } from 'src/app/utilmodules/prais/store/actions/action';
import { DebtorDataInterface } from '../../interfaces/debtorData.interface';
import { currentDataSelector as currentPraisSelector } from '../../../../utilmodules/prais/store/selectors';
import { updateDebtorAction } from '../../store/actions/actions';

@Component({
  selector: 'update-debtor-component',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input('id') id: number;

  form: FormGroup;

  currentSum: number = 0;

  currentDebtorData: DebtorDataInterface[] = [];

  praisList$: Observable<PraisInterface[]>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) {}

  ngOnInit() {
    this.store.dispatch(praisAction());

    this.initializeSubscription();
  }

  initializeSubscription() {
    this.praisList$ = this.store.pipe(select(currentPraisSelector));
  }

  getTypeSearch(): string {
    return 'наименованию';
  }

  onChange($event) {
    /* Инициализировать форму будем прямо здесь, количество на складе и количество в форму могут отличаться */
    this.initializeForm($event);
  }

  initializeForm(product: any) {
    this.form = this.fb.group({
      id: [product.id, Validators.required],
      quantity: [1, Validators.required],
      title: [product.title, Validators.required],
      stock: [{ value: product.stock, disabled: true }],
      price: [{ value: product.price, disabled: true }],
      sum: [{ value: product.price, disabled: true }]
    });
  }

  deletItemCurrentDebtor(index: number) {
    const removeItem = this.currentDebtorData.splice(index, 1);

    this.currentSum -= removeItem[0].quantity * removeItem[0].price;
  }

  onInput() {
    const quantity = this.form.controls.quantity.value;
    const price = this.form.controls.price.value;
    this.form.controls.sum.setValue(quantity * price);
  }

  debtorUpdateDispatch() {
    const debtordata = <any>this.currentDebtorData.map((item) => ({
      id: item.product.id,
      quantity: item.quantity
    }));

    this.store.dispatch(
      updateDebtorAction({
        updateDebtor: {
          clientId: this.id,
          total: 0,
          current: 0,
          debtordata
        }
      })
    );
    this.modalRef.close();
  }

  submit() {
    const formValues = this.form.getRawValue();

    this.currentDebtorData.push({
      id: 0,
      product: { id: formValues.id, title: formValues.title },
      quantity: formValues.quantity,
      price: formValues.price
    });

    this.currentSum += formValues.quantity * formValues.price;
  }
}
