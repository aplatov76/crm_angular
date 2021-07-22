import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
//import {tap} from 'rxjs/internal/operators';
import {HttpErrorResponse} from "@angular/common/http"

import { AuthService } from "../services/auth.service";
import { UserInterface } from "../../../../interfaces/user.interface";
import { PersistanceService } from "../../../../services/persistence.service";
import { getCurrentUserAction, getCurrentUserSuccessAction, getCurrentUserFailureAction } from "../actions/action";
import { Router } from "@angular/router";

@Injectable()
export class GetUserEffect {

    constructor(
        private actions$: Actions, 
        private authService: AuthService, 
        private router: Router,
        private persistenceservice: PersistanceService){
        
    }

    getCurrentUser$ = createEffect(() => this.actions$.pipe(
        ofType(getCurrentUserAction),
        switchMap(() => {
            const token = this.persistenceservice.get('accessToken');

            if(!token){
                return of(getCurrentUserFailureAction())
            }

            return this.authService.getCurrentUser().pipe(
                map((user: UserInterface) => {
                    //console.log('auth get currnet user')
                    //window.localStorage.setItem('accessToken', currentuser.token)
                    return getCurrentUserSuccessAction({user})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(getCurrentUserFailureAction())
                })
            )
        } )
      )
    )


    redirectFailedAuth$ = createEffect(() => this.actions$.pipe(
        ofType(getCurrentUserFailureAction),
        tap(() => {
            //console.log('success redirect')
            this.router.navigate(['/auth'])
        })
    ),
        {dispatch: false}
    )
}