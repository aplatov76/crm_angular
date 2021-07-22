import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common";
import { AuthComponent } from "./components/auth/auth.components";
import { RouterModule } from "@angular/router";
import {ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from "@ngrx/store";

import {reducer} from './store/reducers';
import {LoginEffect} from './store/effects/auth.effect'
import {GetUserEffect} from './store/effects/getCurrentUser.effect';
import { EffectsModule } from "@ngrx/effects";
import { AuthService } from "./store/services/auth.service";
import { PersistanceService } from "../../services/persistence.service";

const routes = [
    {
        path: 'auth',
        component: AuthComponent
    }
]

@NgModule({
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes),
        StoreModule.forFeature('auth', reducer),
        EffectsModule.forFeature([LoginEffect, GetUserEffect])
        
    ],
    declarations: [AuthComponent],
    exports: [AuthComponent],
    providers: [AuthService, PersistanceService]
})
export class AuthModule{

}