import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { isGroupsProduct} from '../../store/selectors';
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import { productGroups, productInsertUpdate } from '../../store/actions/action';

import { ProductInterface } from "../../../../interfaces/product.interface";
import {GroupsInterface} from '../../interfaces/groups.interface';

@Component({
    selector: 'group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy{

    form: FormGroup = null
    id: number
    groupsSub: Subscription
    groups: GroupsInterface[]
    /*true - группа false - позиция */
    view: boolean = true


    constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute){

    }

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'))
        this.store.dispatch(productGroups());

        this.initializeForm()
        this.initializeSubscription()
    }

    ngOnDestroy(){
        this.groupsSub.unsubscribe();
    }

    initializeForm(){
        this.form = this.fb.group({
            title: new FormControl(null, Validators.required),
            //id: [item.id, [Validators.required]],
            stock: [0, [Validators.required]],
            articul: ['00000000', [Validators.required]],
            price: [0.00, [Validators.required]],
            trade_price: [0.00, [Validators.required, Validators.min(0), Validators.max(20000)]],
            parent: [this.id, [Validators.required]],
            visible: [0, [Validators.required]],
            info: [null]
        })
    }

    initializeSubscription(){
        this.groupsSub = this.store.pipe(select(isGroupsProduct), filter(Boolean)).subscribe(
            ((items: GroupsInterface[]) => {
                  this.groups = items
            })
        )
    }

    submit(){
        this.store.dispatch(productInsertUpdate({product: this.form.value}))
    }
}