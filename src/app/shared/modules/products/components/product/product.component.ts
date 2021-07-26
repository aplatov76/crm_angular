import { Component, Input, OnInit } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {productAction, productInsertUpdate } from '../../store/actions/action';
import { isGroupsProduct} from '../../store/selectors';
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import { ProductInterface } from "../../../../interfaces/product.interface";
import {GroupsInterface} from '../../interfaces/groups.interface';
import {isCurrentProduct} from '../../store/selectors';

import { productGroups } from '../../store/actions/action';
import { BsModalService } from "ngx-bootstrap/modal";


@Component({
    selector: 'product-component',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

    form: FormGroup = null
    currentProduct$: Subscription
    currentProduct: ProductInterface
    groups$: Observable<GroupsInterface[]>
    options = {displayField: 'title'};
    @Input() id: number

    value: string[] = [];
    nodes = [
      {
        title: 'parent 1',
        key: '100',
        children: [
          {
            title: 'parent 1-0',
            key: '1001',
            children: [
              { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
              { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
            ]
          },
          {
            title: 'parent 1-1',
            key: '1002',
            children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
          }
        ]
      }
    ];

    onChange($event: string[]): void {
      console.log($event);
    }

    nodes1 = [
        {
          name: 'Каталог',
          children: [
            { 
                name: 'Пленки', 
                children: [
                    {name: 'Изоспан'},
                ]
            },
            { 
              name: 'Утеплители', 
              children: [
                  {name: 'Минеральная вата'}, 
                  {name: 'Базальтовая вата'}] 
            }
          ]
        }
      ];

    //groupsQuery = []

    constructor(
        private fb: FormBuilder, 
        private route: ActivatedRoute, 
        private store: Store,
        public modalService: BsModalService
        ){

    }

    ngOnInit(): void {
        //this.store.dispatch(productGroups());

        
        
        //this.initializeForm()

        if(this.id){
            this.store.dispatch(productAction({id: this.id}))
            this.initializeSubscription()
        }
    }

    initializeSubscription(){
        this.currentProduct$ = this.store.pipe(select(isCurrentProduct), filter(Boolean))
            .subscribe((item: ProductInterface) => {
                this.initializeForm(item[0])
            })


        this.groups$ = this.store.pipe(select(isGroupsProduct))

        /*this.groupsSub = this.store.pipe(select(isGroupsProduct), filter(Boolean)).subscribe(
            ((items: GroupsInterface[]) => {
                  this.groups = items
            })
        )*/

    }

    //`id`, `articul`, `title`, `visible`, `stock`, `price`, `trade_price`, `parent
    initializeForm(item: ProductInterface){

        //this.groupsQuery.push({id: 0, current: item.parent})

        this.form = this.fb.group({
            title: new FormControl(item.title, Validators.required),
            id: [item.id, [Validators.required]],
            stock: [item.stock, [Validators.required]],
            articul: [item.articul, [Validators.required]],
            price: [item.price, [Validators.required]],
            trade_price: [item.trade_price, [Validators.required, Validators.min(1), Validators.max(6)]],
            parentId: [item.parentId, [Validators.required]],
            visible: [item.visible, [Validators.required]],
            description: [item.description]
        })
    }

    submit(){
        this.store.dispatch(productInsertUpdate({product: this.form.value}))
    }
}