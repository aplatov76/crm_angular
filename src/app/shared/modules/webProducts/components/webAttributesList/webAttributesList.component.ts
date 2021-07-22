import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store, select } from "@ngrx/store";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';

import {attributes} from '../../store/actions/action';
import {isAttributesList} from '../../store/selectors';
import { AttributesInterface } from '../../../../interfaces/attributes.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'web-groups-attributes',
    templateUrl: './webAttributesList.component.html',
    styleUrls: ['./webAttributesList.component.css']
})
export class WebAttributesList implements OnInit, OnDestroy{

    attrListSub: Subscription
    attrList: AttributesInterface[] = null
    form: FormGroup

    constructor(private store: Store, private fb: FormBuilder, private router: Router){

    }


    ngOnInit(): void{

        this.store.dispatch(attributes());
        this.initializeSubscription();

    }

    ngOnDestroy(){
        this.attrListSub.unsubscribe();
    }

    initializeSubscription(): void {
        

        this.attrListSub = this.store.pipe(select(isAttributesList), filter(Boolean))
        .subscribe((items: AttributesInterface[]) => {
            this.attrList = items
        })

      }


    addNew(){
        this.router.navigate(["/web-attributes", 0]);
    }

    onEvent = (id) => this.router.navigate(["/web-attributes", id]);
}