import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RequestManagerComponent} from './components/requestManager.component';

const routes = [{
    path: 'request-manager',
    component: RequestManagerComponent
}]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [RequestManagerComponent],
    exports: [RequestManagerComponent]
})
export class RequestManagerModule {

}