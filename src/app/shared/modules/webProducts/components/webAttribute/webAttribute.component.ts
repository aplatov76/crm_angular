import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AttributesInterface } from '../../../../interfaces/attributes.interface';
import {isCurrentAttribute} from '../../store/selectors';
import { attribute, attributeInsertUpdate } from '../../store/actions/action';

@Component({
    selector: 'web-group-attribute',
    templateUrl: './webAttribute.component.html'
})
export class WebAttribute implements OnInit{

    id: number = null
    form: FormGroup = null
    attributeSub$: Subscription

    casing = [
        {id : 1, title: 'МДФ'},
        {id : 2, title: 'ПВХ'},
        {id : 3, title: 'Термопленка'},
        {id : 4, title: 'ХДФ'},
    ];


    constructor(private route: ActivatedRoute, private store: Store, private router: Router, private fb: FormBuilder){

    }

    ngOnInit(): void {
        
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));

        if(this.id && this.id !== 0){
            this.store.dispatch(attribute({id: this.id}));
            this.initializeSubscription();
        }
        if(this.id === 0){
            this.initializeForm(null);
        }
    }


    initializeSubscription(){
        this.attributeSub$ = this.store.pipe(select(isCurrentAttribute), filter(Boolean))
        .subscribe((item: AttributesInterface) => {
            console.log('initialize form', item)
            this.initializeForm(item)
        })
    }


    initializeForm(item?: AttributesInterface){

        this.form = this.fb.group({
            id: [item ? item.id : 0, [Validators.required]],
            only_box: [item ? item.only_box : null, [Validators.required]],
            mass: [item ? item.mass : null, [Validators.required]],
            in_box: [item ? item.in_box : null, [Validators.required]],
            width: [item ? item.width : null, [Validators.required]],
            height: [item ? item.height : null, [Validators.required]],
            lenght: [item ? item.lenght : null, [Validators.required]],
            builder: [item ? item.builder : null, [Validators.required]],
            casing: [item ? item.casing : null, [Validators.required]],
            description : [item ? item.description : null, [Validators.required]]
        })

    }

    remove(){
        alert('Еще не реализовано')
    }

    submit(){
        console.log(this.form.value)
        this.store.dispatch(attributeInsertUpdate({attribute: this.form.value}))
    }

}