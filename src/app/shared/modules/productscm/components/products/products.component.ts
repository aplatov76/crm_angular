import {
  Component,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import {
  filter,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { productsCmAction } from '../../store/actions/action';
import { ProductsCmInterface } from '../../interfaces/productscm.interface';
import { environment } from '../../../../../../environments/environment';

import {
  isProductsCmList,
  isLoadingProductsCmList
} from '../../store/selectors';
import { ProductsCmService } from '../../store/services/productscm.service';
import { CurrentCmProductComponent } from '../current/current.component';
import { ProductCmInterface } from '../../interfaces/productcm.interface';

@Component({
  selector: 'productscm',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsCmComponent implements OnInit, OnDestroy {
  isCollapsed: boolean = false;

  baseUrl: string = `${environment.url}/cm`;

  searchValue: string = '';

  currentDocument = { id: null, show: false };

  search = new FormControl();

  /** костыль для запроса который занесет цены текущих прайсов в бд */
  private pushPrices: boolean = false;

  private viewContainerRef: ViewContainerRef;

  productscm$: Subscription;

  modalPushPrices$: Subscription;

  removePrices$: Subscription;

  productsLoading$: Observable<Boolean>;

  nodes: ProductsCmInterface[];

  root: Observable<any>;

  modelChanged: Subject<string> = new Subject<string>();

  constructor(
    private modal: NzModalService,
    private cmService: ProductsCmService,
    private toastservice: ToastrService,
    private store: Store
  ) {}

  ngOnInit(): void {
    //
    this.initializeSubscription();
    // this.modal.afterAllClose
  }

  ngOnDestroy() {
    if (this.modalPushPrices$) this.modalPushPrices$.unsubscribe();
    if (this.removePrices$) this.removePrices$.unsubscribe();

    this.productscm$.unsubscribe();

    this.modelChanged.next(null);
    this.modelChanged.complete();
  }

  nzClick(index) {
    if (this.currentDocument.id === index) {
      this.nodes = null;
      this.currentDocument = { id: null, show: false };
      return;
    }

    this.store.dispatch(
      productsCmAction({ query: { parent: `${index}` } })
    );
    this.currentDocument = {
      id: index,
      show: !this.currentDocument.show
    };
  }

  showSelectProduct(index: number) {
    const currentProduct: ProductCmInterface = this.nodes[index];

    if (!currentProduct.articul) {
      this.toastservice.error('Это категория');
      return;
    }

    this.modal.create({
      nzTitle: currentProduct.title,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        product: currentProduct
      },
      nzFooter: [],
      nzStyle: { width: '80%' },
      nzAutofocus: null,
      nzContent: CurrentCmProductComponent
    });
  }

  initializeSubscription() {
    this.root = this.cmService.getProducts({ parent: 'root' });

    this.productscm$ = this.store
      .pipe(select(isProductsCmList), filter(Boolean))
      .subscribe((items: ProductsCmInterface[]) => {
        this.nodes = items.map((item) => ({
          ...item,
          visible: true
        }));
      });
    this.productsLoading$ = this.store.pipe(
      select(isLoadingProductsCmList)
    );

    this.modelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((model) => {
        this.searchValue = model;
        if (this.nodes) {
          this.nodes = this.nodes.map((item) =>
            item.title.toLowerCase().includes(this.searchValue)
              ? { ...item, visible: true }
              : { ...item, visible: false }
          );
        }
      });
  }

  onChange(text: string) {
    this.modelChanged.next(text);
  }

  removeCurrentPrices() {
    this.removePrices$ = this.cmService
      .removeCurrentPrices()
      .subscribe(() => {
        this.toastservice.info('Текущий прайс удален');
      });
  }

  createTplModal(
    tplTitle: string,
    tplContent: TemplateRef<{}>
  ): void {
    const m = this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzMaskClosable: false,
      nzClosable: true,
      nzComponentParams: {
        value: 'Загрузка прайсов'
      },
      nzFooter: [],
      nzStyle: { width: '80%' },
      nzAutofocus: null
    });

    this.modalPushPrices$ = m.afterClose.subscribe(() => {
      if (this.pushPrices) {
        this.cmService.pushProductCmPrice();
        this.pushPrices = false;
      }
    });
  }

  handleChange(): void {
    this.pushPrices = true;
  }
}
