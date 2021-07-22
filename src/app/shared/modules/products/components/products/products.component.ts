import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { State, Store, select } from '@ngrx/store';
import { productsAction, productGroups } from '../../store/actions/action';
import {isProductsList, isGroupsProduct} from '../../store/selectors';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductsInterface } from '../../interfaces/products.interface';
import { Router } from '@angular/router';
import { TreeModel, TreeNode, TreeComponent } from '@circlon/angular-tree-component';

//import { TreeTableData, TreeTableHeaderObject, TreeTableRow, ExpandableType, TreeTableDataConfig, ExpandableArrowPlacement } from 'angular-tree-table';

@Component({
    selector: 'products-component',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private store: Store, private router: Router){

  }

  productsSub: Subscription
  nodes: ProductsInterface[] = null
  /*true => tree, false => table */
  currentView: boolean = true
  productsTable: ProductsInterface[] = []
      
      options = {displayField: 'title'};


      ngOnInit():void {
        //this.populateDummyData()
        this.store.dispatch(productsAction());
        

        this.initializeSubscription()
      }
      //tree.treeModel.filterNodes(filter.value)

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
           // console.log(items)
            this.nodes = items//this.buildTree(items)
            this.treeToTable(items)
            //console.log(this.nodes)
            //this.productsTable = this.treeToTable(items)
            //this.groups = this.filterData(this.products)

          }
        )
      }

      treeToTable(arr: ProductsInterface[]){
          //return arr.map(item => (item.children) ? this.treeToTable(item.children) : ({...item, children: null}))
          arr.map(item => {
            if(item.children){ 
                this.productsTable.push({...item, children: null})
                this.treeToTable(item.children) 
            } 
            else if(!item.price)this.productsTable.push({...item, children: null})
            else this.productsTable.push({...item, visible: 2, children: null})
          }
        )
      }

      itemTableVisible(id, view){
        //console.log('itemVisibleTable');
        this.productsTable = this.productsTable.map(item => (item.parent === id) ? ({...item, visible: view}) : item);
      }

      del(){
        //this.treeToTable(this.nodes);
        console.log(this.productsTable);
      }

      onEventTable = (id) => this.router.navigate(['/products', id]);
      onEvent = ($event) => this.router.navigate(['/products', $event.node.data.id]);
}
