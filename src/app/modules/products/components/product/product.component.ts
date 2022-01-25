import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { catchError, filter } from 'rxjs/operators';
import { cloneDeep } from 'lodash-es';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import {
  productAction,
  productActionRemove,
  productInsertUpdate
} from '../../store/actions/action';
import {
  isGroupsProduct,
  isCurrentProduct
} from '../../store/selectors';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { GroupsInterface } from '../../interfaces/groups.interface';

import { ProductsService } from '../../store/services/products.service';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  form: FormGroup;

  currentProduct$: Subscription;

  currentProduct: ProductInterface;

  currentProductCountCm$: Observable<number>;

  groups$: Subscription;

  groups: GroupsInterface[];

  @Input() id: number;

  @Input() type: string;

  @Input() event: string;

  @Input() valueChange: Subject<string>;

  currentParent: number[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private modal: NzModalRef,
    private modalConfirm: NzModalService,
    private toastr: ToastrService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.initializeSubGroup();

    if (this.id && this.event === 'correct') {
      this.store.dispatch(productAction({ id: this.id }));
      this.initializeSubscription();
    }

    if (this.event === 'new') {
      this.initializeForm(null);
    }
  }

  ngOnDestroy(): void {
    this.groups$.unsubscribe();
    if (this.currentProduct$) this.currentProduct$.unsubscribe();
  }

  initializeSubscription() {
    this.currentProduct$ = this.store
      .pipe(select(isCurrentProduct), filter(Boolean))
      .subscribe((item: ProductInterface) => {
        this.initializeForm(item[0]);
        this.currentProductCountCm$ = this.productService
          .getCountCm({ articul: item[0].articul })
          .pipe(
            catchError(() => {
              this.toastr.warning('Не удалось загрузить остаток СМ');
              return of({ count: 'ошибка загрузки' } as any);
              // throw err;
            })
          );
      });
  }

  initializeSubGroup() {
    this.groups$ = this.store
      .pipe(select(isGroupsProduct), filter(Boolean))
      .subscribe((items: GroupsInterface[]) => {
        this.groups = cloneDeep(items);
      });
  }

  initializeForm(item: ProductInterface | null) {
    this.currentParent.push(item ? item.parent : this.id);
    this.form = this.fb.group({
      title: new FormControl(
        item ? item.title : null,
        Validators.required
      ),
      id: [item ? item.id : null],
      stock: [item ? item.stock : null, [Validators.required]],
      articul: [item ? item.articul : null, [Validators.required]],
      price: [item ? item.price : null, [Validators.required]],
      trade_price: [
        item ? item.trade_price : null,
        [Validators.required, Validators.min(1), Validators.max(6)]
      ],
      parent: [
        item ? [item.parent] : [this.id],
        [Validators.required]
      ],
      visible: [item ? item.visible : 1, [Validators.required]],
      description: [item ? item.description : null],
      coefficient: [item ? item.coefficient : 1]
    });
  }

  submit() {
    this.store.dispatch(
      productInsertUpdate({
        product: {
          ...this.form.value,
          parent: {
            id: this.form.value.parent[0]
              ? this.form.value.parent[0]
              : null
          }
        }
      })
    );
    this.modal.close();
  }

  showDeleteConfirm(): void {
    this.modalConfirm.confirm({
      nzTitle: `Удаление ${
        this.type === 'group' ? ' группы' : ' позиции'
      }`,
      nzContent: `<b style="color: red;">Действительно удалить ${this.form.value.title} ? </b>`,
      nzOkText: 'Да',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.remove(),
      nzCancelText: 'Нет',
      nzOnCancel: () => null,
      nzAutofocus: null
    });
  }

  remove() {
    this.store.dispatch(productActionRemove({ id: this.id }));
    this.modal.close();
  }
}
