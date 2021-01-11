import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Store} from "@ngrx/store"

import {getCurrentUserAction} from './shared/modules/auth/store/actions/action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  view: boolean = true;

  constructor(private store: Store){

  }

  ngOnInit(): void {
    //this.store.dispatch(getCurrentUserAction())  
  }
}
