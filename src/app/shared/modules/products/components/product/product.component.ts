import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {productAction, productInsertUpdate } from '../../store/actions/action';
import { isGroupsProduct} from '../../store/selectors';
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import { ProductInterface } from "../../../../interfaces/product.interface";
import {GroupsInterface} from '../../interfaces/groups.interface';
import {isCurrentProduct} from '../../store/selectors';

import { productGroups } from '../../store/actions/action';


@Component({
    selector: 'product-component',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

    form: FormGroup = null
    id: number
    currentProduct: Subscription
    groupsSub: Subscription
    groups: GroupsInterface[]

    //groupsQuery = []

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private store: Store){

    }

    ngOnInit(): void {

        this.id = parseInt(this.route.snapshot.paramMap.get('id'))
        this.store.dispatch(productGroups());
        
        //this.initializeForm()
        if(this.id){
            this.store.dispatch(productAction({id: this.id}))
            this.initializeSubscription()
        }
    }

    initializeSubscription(){
        this.currentProduct = this.store.pipe(select(isCurrentProduct), filter(Boolean))
            .subscribe((item: ProductInterface) => this.initializeForm(item))

        this.groupsSub = this.store.pipe(select(isGroupsProduct), filter(Boolean)).subscribe(
            ((items: GroupsInterface[]) => {
                  this.groups = items
            })
        )

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
            parent: [item.parentId, [Validators.required]],
            visible: [item.visible, [Validators.required]],
            info: [item.info]
        })
    }

    submit(){
        this.store.dispatch(productInsertUpdate({product: this.form.value}))
    }
}