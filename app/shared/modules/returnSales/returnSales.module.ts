import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReturnSalesComponent} from './components/returnSales.component';

const routes = [{
    path: 'return-sales',
    component: ReturnSalesComponent
}]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [ReturnSalesComponent],
    exports: [ReturnSalesComponent]
})
export class ReturnSalesModule {

}