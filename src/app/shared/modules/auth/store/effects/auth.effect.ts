import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { loginActionSuccess, loginActionFailed, loginAction } from "../actions/action";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
//import {tap} from 'rxjs/internal/operators';
import {HttpErrorResponse} from "@angular/common/http"

import { AuthService } from "../services/auth.service";
import { UserInterface } from "../../../../interfaces/user.interface";
import { PersistanceService } from "../../../../services/persistence.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginEffect {

    constructor(
        private actions$: Actions, 
        private authService: AuthService, 
        private persistenceservice: PersistanceService,
        private router: Router){
        
    }

    register$ = createEffect(() => this.actions$.pipe(
        ofType(loginAction),
        switchMap(({request}) => {
            return this.authService.login(request).pipe(
                map((currentUser: any) => {
                    console.log('currentUser: ',currentUser)
                    //window.localStorage.setItem('accessToken', currentuser.token)
                    this.persistenceservice.set('accessToken', currentUser.user.token)
                    return loginActionSuccess({currentUser})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(loginActionFailed())
                })
            )
        } )
      )
    )

    redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
        ofType(loginActionSuccess),
        tap(() => {
            //console.log('success redirect')
            this.router.navigate(['/'])
        })
    ),
        {dispatch: false}
    )

    redirectFailedAuth$ = createEffect(() => this.actions$.pipe(
        ofType(loginActionFailed),
        tap(() => {
            //console.log('success redirect')
            this.router.navigate(['/auth'])
        })
    ),
        {dispatch: false}
    )
}