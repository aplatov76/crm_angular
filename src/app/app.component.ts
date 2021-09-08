import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {select, Store} from "@ngrx/store"
import { Observable } from 'rxjs';
import { UserInterface } from './shared/interfaces/user.interface';

import {getCurrentUserAction, loginActionFailed} from './shared/modules/auth/store/actions/action';
import {currentUserSelector} from './shared/modules/auth/store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  view: boolean = true;
  currentUser$: Observable<Boolean>

  constructor(private store: Store){

  }

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
    this.initializeSubscription();
  }

  initializeSubscription(){
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }

  out(){
    console.log('out')
    this.store.dispatch(loginActionFailed());
  }
}
