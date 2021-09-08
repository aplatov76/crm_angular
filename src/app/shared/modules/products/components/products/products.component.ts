import {Component, OnInit, OnDestroy, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { State, Store, select } from '@ngrx/store';
import { productsAction, productGroups } from '../../store/actions/action';
import {orderInsertAction} from '../../../ordercm/store/actions/action';
import {isProductsList, isGroupsProduct, isCurrentProduct} from '../../store/selectors';

import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductsInterface } from '../../interfaces/products.interface';
import { Router } from '@angular/router';
import {cloneDeep} from 'lodash-es';
import { ToastrService } from 'ngx-toastr';

import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ProductComponent } from '../product/product.component';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import {OrderCmDataInterface} from '../../../ordercm/interfaces/ordercmdata.interface';

@Component({
    selector: 'products-component',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(
      private store: Store, 
      private router: Router,
      private modalService: NzModalService,
      private toastr: ToastrService,
      private viewContainerRef: ViewContainerRef
  ){

  }

  isCollapsed: boolean = false
  searchValue = '';
  productsSub: Subscription
  productSub: Subscription
  nodes: ProductsInterface[] = null
  productsTable: ProductsInterface[] = []
  expandedNodeList: number[]  = []
  

  /**start nz tree */

  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;

  nzClick(event: any): void {

    const tmp: any = Object.assign({}, event.node.origin);

    this.showModalProduct(event.node.origin.id, (tmp.price) ? 'product' : 'group' , 'correct', event.node.origin.title)
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log('event',event);
  }

  // nzSelectedKeys change
  nzSelect(): void {
    const checkedElement: any = this.nzTreeComponent.getCheckedNodeList();
    
    const checkedProducts = this.detourTreeProducts(checkedElement).flat(Infinity);
    if(checkedProducts.length > 0){
      this.store.dispatch(orderInsertAction({orderdata: checkedProducts}));
      //гарантии конечно нет, но обрабатыввать лень
      this.toastr.info('Заявка обновлена')
    }
  }

  detourTreeProducts(tree: NzTreeNode[]): any{

    return tree.map((item: any) => {
      //console.log(item.origin.children.length > 0)
      if(item._children.length > 0)return this.detourTreeProducts(item._children);
      return ({title:  item.origin.title, articul: item.origin.articul, quantity: 1, trade_price: item.origin.trade_price, unit: 1});
    })

  }

  nzOpen(event: NzFormatEmitEvent){
    this.expandedNodeList = this.nzTreeComponent.getExpandedNodeList().map(item => parseInt(item.key));
    //console.log(this.expandedNodeList)
  }
  
  ngAfterViewInit(): void {

  }
  
  /*ens nz tree*/

  ngOnInit():void {
        //this.store.dispatch(productsAction({view: 'tree'}));
        this.store.dispatch(productsAction({query: {view: 'tree'}}));
        this.store.dispatch(productGroups())
        this.initializeSubscription()
  }
     

      ngOnDestroy():void {
        this.productsSub.unsubscribe();
      }

      initializeSubscription(): void {
        this.productsSub = this.store.pipe(select(isProductsList), filter(Boolean)).subscribe(
          (items: ProductsInterface[]) => {

            this.nodes = cloneDeep(items)
            this.expandedNodeList = [...this.expandedNodeList]
          }
        )
      }

    /**
     * 
     * @param id 
     * @param type 
     * @param event 
     * @param title 
     */
    showModalProduct(id: number, type: string, event: string, title: string): void {

      //this.expandedNodeList = this.nzTreeComponent.getExpandedNodeList().map(item => item.key);

      const valueChange = new Subject<string>();

      
      this.modalService.create({
        nzTitle: title,
        nzViewContainerRef: this.viewContainerRef,
        nzComponentParams: {
          id: id,
          type: type,
          event: event,
          valueChange
        },
        nzFooter: [],
        nzStyle: { width: '80%' },
        nzAutofocus: null,
        nzContent: ProductComponent
      });

      
    }

}