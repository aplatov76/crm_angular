import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  getCurrentUserAction,
  loginActionFailed
} from './modules/auth/store/actions/action';
import { currentUserSelector } from './modules/auth/store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  view: boolean = true;

  currentUser$: Observable<Boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
    this.initializeSubscription();
  }

  initializeSubscription() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }

  out() {
    this.store.dispatch(loginActionFailed());
  }
}
