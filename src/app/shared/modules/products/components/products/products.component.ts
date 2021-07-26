import {Component, OnInit, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import { State, Store, select } from '@ngrx/store';
import { productsAction, productGroups } from '../../store/actions/action';
import {isProductsList, isGroupsProduct} from '../../store/selectors';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductsInterface } from '../../interfaces/products.interface';
import { Router } from '@angular/router';
import { TreeModel, TreeNode, TreeComponent, ITreeOptions } from '@circlon/angular-tree-component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

//import { TreeTableData, TreeTableHeaderObject, TreeTableRow, ExpandableType, TreeTableDataConfig, ExpandableArrowPlacement } from 'angular-tree-table';

@Component({
    selector: 'products-component',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(
      private store: Store, 
      private router: Router,
      private modalService: BsModalService
      ){

  }

  productsSub: Subscription
  nodes: ProductsInterface[] = null
  productsTable: ProductsInterface[] = []
  modalRef: BsModalRef
      
  options = {displayField: 'title'};
  selectedProduct: number

      ngOnInit():void {
        this.store.dispatch(productsAction({view: 'tree'}));
        this.store.dispatch(productGroups())
        this.initializeSubscription()
      }
     

      filterFn(value: string, treeModel: TreeModel) {
        value = value.toLowerCase();
        const t = RegExp(value, 'i')
        treeModel.filterNodes((node: TreeNode) => t.test(node.data.title))//!node.data.name.toLowerCase().indexOf(value))
      }

     addChildren(id):void {
        this.router.navigate(['group', id]);
        console.log('hello click')
      }

      ngOnDestroy():void {
        this.productsSub.unsubscribe();
      }

      initializeSubscription(): void {
        this.productsSub = this.store.pipe(select(isProductsList), filter(Boolean)).subscribe(
          (items: ProductsInterface[]) => {

            this.nodes = items

          }
        )
      }

      itemTableVisible(id, view){
        //console.log('itemVisibleTable');
        this.productsTable = this.productsTable.map(item => (item.parentId === id) ? ({...item, visible: view}) : item);
      }

      del(){
        //this.treeToTable(this.nodes);
        console.log(this.productsTable);
      }

      onEventTable = (id) => this.router.navigate(['/products', id]);
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

      openModal(template: TemplateRef<any>, idproduct: any) {
        //console.log('modal start')
        this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }
}
