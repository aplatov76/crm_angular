import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HistorySalesComponent} from './components/historySales.component';

const routes = [{
    path: 'history-sales',
    component: HistorySalesComponent
}]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [HistorySalesComponent],
    exports: [HistorySalesComponent]
})
export class HistorySalesModule {

}