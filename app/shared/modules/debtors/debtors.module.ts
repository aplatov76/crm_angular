import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DebtorsComponent} from './components/debtors.component';

const routes = [{
    path: 'debtors',
    component: DebtorsComponent
}]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [DebtorsComponent],
    exports: [DebtorsComponent]
})
export class DebtorsModule {

}