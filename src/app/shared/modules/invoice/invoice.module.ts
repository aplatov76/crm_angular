import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {InvoiceComponent} from './components/invoice.component';

const routes = [{
    path: 'invoice',
    component: InvoiceComponent
}]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [InvoiceComponent],
    exports: [InvoiceComponent]
})
export class InvoiceModule {

}