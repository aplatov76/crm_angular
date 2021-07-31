import {Component, OnInit, OnDestroy, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { State, Store, select } from '@ngrx/store';
import { productsAction, productGroups } from '../../store/actions/action';
import {isProductsList, isGroupsProduct, isCurrentProduct} from '../../store/selectors';

import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductsInterface } from '../../interfaces/products.interface';
import { Router } from '@angular/router';
import {cloneDeep} from 'lodash-es';

import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ProductComponent } from '../product/product.component';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

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
    console.log('click id',event.node.origin);

    const tmp: any = Object.assign({}, event.node.origin);

    this.showModalProduct(event.node.origin.id, (tmp.price) ? 'product' : 'group' , 'correct', event.node.origin.title)
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log('event',event);
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log('keys: ', keys, this.nzTreeComponent.getSelectedNodeList());
  }

  nzOpen(event: NzFormatEmitEvent){
    this.expandedNodeList = this.nzTreeComponent.getExpandedNodeList().map(item => parseInt(item.key));
    console.log(this.expandedNodeList)
  }
  
  ngAfterViewInit(): void {
    // get node by key: '10011'
    //console.log(this.nzTreeComponent.getTreeNodeByKey('10011'));
    // use tree methods
    /*console.log(
      this.nzTreeComponent.getTreeNodes(),
      this.nzTreeComponent.getCheckedNodeList(),
      this.nzTreeComponent.getSelectedNodeList(),
      this.nzTreeComponent.getExpandedNodeList()
    );*/
    //this.nzTreeComponent.beforeInit

   // console.log('get node: ', this.nzTreeComponent.getTreeNodeByKey('2'));
  }
  

  /*ens nz tree*/
/*     
  options = {
    displayField: 'title',
    allowDrag: (node) => node.isLeaf
  };
  

  onMoveNode($event) {
    console.log(
      "Moved",
      $event.node.title,
      "to",
      $event.to.parent.title,
      "at index",
      $event.to.index);
  }
  */

      ngOnInit():void {
        //this.store.dispatch(productsAction({view: 'tree'}));
        this.store.dispatch(productsAction({query: {view: 'tree'}}));
        this.store.dispatch(productGroups())
        this.initializeSubscription()
      }
     
    /*
      filterFn(value: string, treeModel: TreeModel) {
        value = value.toLowerCase();
        const t = RegExp(value, 'i')
        treeModel.filterNodes((node: TreeNode) => t.test(node.data.title))//!node.data.name.toLowerCase().indexOf(value))
      }

     addChildren(id):void {
        this.router.navigate(['group', id]);
        console.log('hello click')
     }
      */

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

       // this.productSub = this.store.pipe(select(isCurrentProduct), filter(Boolean)).su
      }

      /*
      itemTableVisible(id, view){
        //console.log('itemVisibleTable');
        this.productsTable = this.productsTable.map(item => (item.parentId === id) ? ({...item, visible: view}) : item);
      }

      del(){
        //this.treeToTable(this.nodes);
        console.log(this.productsTable);
      }

      */

      //onEventTable = (id) => this.router.navigate(['/products', id]);

      /*
      onEvent = ($event, template: TemplateRef<any>) => {
        //console.log('event start')
        //this.router.navigate(['/products', $event.node.data.id]);
        //console.log($event)
        if($event.node.data.price){
          console.log('position ', $event.node.data.id)

          this.selectedProduct = $event.node.data.id
          this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
        }
      }

      */

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

      const valueChangeSubscription = valueChange
      .asObservable()
      .subscribe(value => {
        console.log(value)
      });
      
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
