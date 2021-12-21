import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { cloneDeep } from 'lodash-es';
import pdfMake from 'pdfmake/build/pdfmake';
import { ToastrService } from 'ngx-toastr';

import { NzTreeComponent, NzTreeNode } from 'ng-zorro-antd/tree';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { ProductComponent } from '../product/product.component';
import { ProductsInterface } from '../../interfaces/products.interface';
import { isProductsList } from '../../store/selectors';
import { orderInsertAction } from '../../../ordercm/store/actions/action';
import {
  productsAction,
  productGroups
} from '../../store/actions/action';

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private modalService: NzModalService,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef
  ) {}

  isCollapsed: boolean = false;

  searchValue = '';

  productsSub: Subscription;

  productSub: Subscription;

  nodes: ProductsInterface[] = null;

  productsTable: ProductsInterface[] = [];

  /** Открытые категории */
  expandedNodeList: number[] = [];

  /** start nz tree */

  @ViewChild('nzTreeComponent', { static: false })
  nzTreeComponent!: NzTreeComponent;

  nzClick(event: any): void {
    const tmp: any = { ...event.node.origin };

    this.showModalProduct(
      event.node.origin.id,
      tmp.price ? 'product' : 'group',
      'correct',
      event.node.origin.title
    );
  }

  nzSelect(): void {
    const checkedElement: any =
      this.nzTreeComponent.getCheckedNodeList();

    const checkedProducts = this.detourTreeProducts(checkedElement)
      .flat(Infinity)
      .filter((item) => item.price);
    if (checkedProducts.length > 0) {
      this.store.dispatch(
        orderInsertAction({ orderdata: checkedProducts })
      );
      // гарантии конечно нет, но обрабатыввать лень
      this.toastr.info('Заявка обновлена');
    }
  }

  detourTreeProducts(tree: NzTreeNode[]): any {
    return tree.map((item: any) => {
      if (item._children.length > 0)
        return this.detourTreeProducts(item._children);
      return {
        title: item.origin.title,
        articul: item.origin.articul,
        quantity: 1,
        trade_price: item.origin.trade_price,
        unit: 1,
        price: item.origin.price,
        id: item.origin.id
      };
    });
  }

  nzOpen() {
    this.expandedNodeList = this.nzTreeComponent
      .getExpandedNodeList()
      .map((item) => parseInt(item.key, 10));
  }

  /* ens nz tree */

  ngOnInit(): void {
    this.store.dispatch(productsAction({ query: { view: 'tree' } }));
    this.store.dispatch(productGroups());
    this.initializeSubscription();
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

  initializeSubscription(): void {
    this.productsSub = this.store
      .pipe(select(isProductsList), filter(Boolean))
      .subscribe((items: ProductsInterface[]) => {
        this.nodes = cloneDeep(items);
        this.expandedNodeList = [...this.expandedNodeList];
      });
  }

  /**
   *
   * @param id
   * @param type
   * @param event
   * @param title
   */
  showModalProduct(
    id: number,
    type: string,
    event: string,
    title: string
  ): void {
    const valueChange = new Subject<string>();

    this.modalService.create({
      nzTitle: title,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        id,
        type,
        event,
        valueChange
      },
      nzFooter: [],
      nzStyle: { width: '80%' },
      nzAutofocus: null,
      nzContent: ProductComponent
    });
  }

  printPriceList(): void {
    const checkedElement: any =
      this.nzTreeComponent.getCheckedNodeList();

    const checkedProducts = this.detourTreeProducts(checkedElement)
      .flat(Infinity)
      .filter((item) => item.price);
    if (checkedProducts.length > 0) {
      this.createCheck(checkedProducts);
    } else this.toastr.error('Ничего не выбрано');
  }

  createCheck(products: ProductInterface[]) {
    const tmp: Array<Array<ProductInterface>> = [];
    const productsLength = products.length;

    products.forEach((item, index) => {
      if (index % 2 === 0 && index > 0) {
        tmp.push([products[index - 2], products[index - 1]]);
      }
      if (index % 2 === 1 && index === productsLength - 1)
        tmp.push([products[index - 1], products[index]]);
    });

    if (productsLength % 2) {
      tmp.push([
        products[productsLength - 1],
        {
          ...products[productsLength - 1],
          title: 'Пустой ценник',
          price: 0,
          id: 0
        }
      ]);
    }

    const docDefinition = {
      pageOrientation: 'portrait',
      content: [
        {
          style: 'tableExample',

          table: {
            widths: ['*', '*'],
            body: [
              ...tmp.map((item, index) => [
                {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [
                        'Наименование: ',
                        {
                          text: `Код: ${item[0].id}`,
                          aligment: 'right'
                        }
                      ],
                      [
                        {
                          text: item[0].title,
                          colSpan: 2,
                          alignment: 'center'
                        },
                        {}
                      ],
                      [`Цена: ${item[0].price} руб.`, {}]
                    ]
                  }
                },
                {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      ['Наименование: ', `Код: ${item[1].id}`],
                      [
                        {
                          text: item[1].title,
                          colSpan: 2,
                          alignment: 'center'
                        },
                        {}
                      ],
                      [`Цена: ${item[1].price} руб.`, {}]
                    ]
                  }
                }
              ])
            ]
          }
        }
      ],
      styles: {
        tableExample: {
          width: '100%'
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
