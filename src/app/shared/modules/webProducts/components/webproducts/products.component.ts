import { Component, OnInit, AfterViewInit,AfterViewChecked, OnDestroy, ViewChild } from "@angular/core";
import { State, Store, select } from "@ngrx/store";
import { productsAction, productGroups } from "../../store/actions/action";
import { isProductsList, isGroupsProduct } from "../../store/selectors";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { ProductsInterface } from "../../interfaces/products.interface";
import { ActivatedRoute, Router } from "@angular/router";
import {
  TreeModel,
  TreeNode,
  TreeComponent,
} from "@circlon/angular-tree-component";

//import { TreeTableData, TreeTableHeaderObject, TreeTableRow, ExpandableType, TreeTableDataConfig, ExpandableArrowPlacement } from 'angular-tree-table';

@Component({
  selector: "web-products-component",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class WebProductsComponent implements OnInit, OnDestroy, AfterViewChecked {
  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  @ViewChild("tree") treeComponent: TreeComponent;

  productsSub: Subscription;
  nodes: ProductsInterface[] = null;
  routerParams: Subscription;
  /*true => tree, false => table */
  currentView: boolean = true;
  productsTable: ProductsInterface[] = [];
  paramId = null

  options = { displayField: "title", isExpanded: true };

  ngOnInit(): void {
    //this.populateDummyData()
    this.store.dispatch(productsAction());
    //getNodeById

    this.initializeSubscription();
  }

  ngAfterViewChecked(): void {

   // const id = 6;//this.route.snapshot.paramMap.get('id');
   // console.log('after id: ', this.route.snapshot.params['id'])

   /**Ебаный костыль */
   if(this.paramId !== null && this.paramId !== undefined){
    const treeModel: TreeModel = this.treeComponent.treeModel;
     const firstNode: TreeNode = treeModel.getNodeById(this.paramId);

     if(firstNode !== null){
      firstNode.ensureVisible();
      firstNode.expand();
      this.paramId = null;
     }
   }

  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

  //tree.treeModel.filterNodes(filter.value)

  filterFn(value: string, treeModel: TreeModel) {
    value = value.toLowerCase();
    const t = RegExp(value, "i");
    treeModel.filterNodes((node: TreeNode) => t.test(node.data.title)); //!node.data.name.toLowerCase().indexOf(value))
  }

  addChildren(id): void {
    this.router.navigate(["webgroup", id]);
    console.log("hello click");
  }

  initializeSubscription(): void {
    this.productsSub = this.store
      .pipe(select(isProductsList), filter(Boolean))
      .subscribe((items: ProductsInterface[]) => {
        // console.log(items)
        this.nodes = items; //this.buildTree(items)
        this.treeToTable(items);
        //console.log(this.nodes)
        //this.productsTable = this.treeToTable(items)
        //this.groups = this.filterData(this.products)
      });

      this.routerParams = this.route.params.pipe(filter(x => x !== undefined)).subscribe(
        params  =>  this.paramId = params['id']);
  }

  treeToTable(arr: ProductsInterface[]) {
    //return arr.map(item => (item.children) ? this.treeToTable(item.children) : ({...item, children: null}))
    arr.map((item) => {
      if (item.children) {
        this.productsTable.push({ ...item, children: null });
        this.treeToTable(item.children);
      } else if (!item.price)
        this.productsTable.push({ ...item, children: null });
      else this.productsTable.push({ ...item, visible: 2, children: null });
    });
  }

  itemTableVisible(id, view) {
    //console.log('itemVisibleTable');
    this.productsTable = this.productsTable.map((item) =>
      item.parent === id ? { ...item, visible: view } : item
    );
  }

  onEventTable = (id) => this.router.navigate(["/webproducts", id]);
  onEvent = ($event) =>
    this.router.navigate(["/webproducts", $event.node.data.id]);
}
