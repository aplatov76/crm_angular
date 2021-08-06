import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {productAction, productInsertUpdate, productsAction } from '../../store/actions/action';
import { isGroupsProduct} from '../../store/selectors';
import { Observable, of, Subject,  Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import { ProductInterface } from "../../../../interfaces/product.interface";
import {GroupsInterface} from '../../interfaces/groups.interface';
import {isCurrentProduct} from '../../store/selectors';

import {cloneDeep} from 'lodash-es';
import { NzModalRef } from "ng-zorro-antd/modal";
import { ProductsService } from "../../store/services/products.service";

@Component({
    selector: 'product-component',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy{

    form: FormGroup
    currentProduct$: Subscription
    currentProduct: ProductInterface
    currentProductCountCm$: Observable<number>
    groups$: Subscription
    groups: GroupsInterface[]

    @Input() id: number
    @Input() type: string
    @Input() event: string
    @Input() valueChange: Subject<string>;

    currentParent: number[] = [];

    onChange($event: string[]): void {
      console.log($event);
    }
    

    constructor(
        private fb: FormBuilder, 
        private route: ActivatedRoute, 
        private store: Store,
        private modal: NzModalRef,
        private productService: ProductsService
    ){}

    ngOnInit(): void {

      this.initializeSubGroup();

        if(this.id && this.event === 'correct'){
            this.store.dispatch(productAction({id: this.id}));
            this.initializeSubscription();
        }

        if(this.event === 'new'){
          this.initializeForm(null);
        }

    }

    ngOnDestroy(): void{

      this.groups$.unsubscribe();
      this.currentProduct$.unsubscribe();
    }
    initializeSubscription(){
        this.currentProduct$ = this.store.pipe(select(isCurrentProduct), filter(Boolean))
            .subscribe((item: ProductInterface) => {
                this.initializeForm(item[0])
                this.currentProductCountCm$ = this.productService.getCountCm({articul: item[0].articul});
        })

     // of(this.currentProduct).pipe(
     //   this.productService.getCountCm({query: {articul: this.currentProduct.articul}})
     // )

    }

    initializeSubGroup(){
      this.groups$ = this.store.pipe(select(isGroupsProduct), filter(Boolean))
          .subscribe((items: GroupsInterface[]) => {
                console.log('sub');
                this.groups = cloneDeep(items);
      })
    }

    //`id`, `articul`, `title`, `visible`, `stock`, `price`, `trade_price`, `parent
    initializeForm(item: ProductInterface | null){

      this.currentParent.push(item ? item.parent : this.id)
      //console.log('currentParent:', item , this.id)

        this.form = this.fb.group({
            title: new FormControl(item ? item.title : null, Validators.required),
            id: [item ? item.id : null, [Validators.required]],
            stock: [item ? item.stock : null, [Validators.required]],
            articul: [item ? item.articul : null, [Validators.required]],
            price: [item ? item.price : null, [Validators.required]],
            trade_price: [item ? item.trade_price : null, [Validators.required, Validators.min(1), Validators.max(6)]],
            parent: [item ? [item.parent] : [this.id], [Validators.required]],
            //parent: [item ? 8: 8, [Validators.required]],
            visible: [item ? item.visible : null, [Validators.required]],
            description: [item ? item.description : null]
        })
    }

    submit(){
      console.log('update product: ',{...this.form.value, parent: this.form.value.parent[0]})
      //this.newItemEvent.emit({...this.form.value, parent: this.form.value.parent[0]});

      this.store.dispatch(productInsertUpdate({product: {...this.form.value, parent: this.form.value.parent[0]}}));
      //this.valueChange.next('hello')
      
      this.modal.close();
      
    }

    remove(){
      console.log(this.groups)
    }
    
}