import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HistorySalesComponent} from './components/history/historySales.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [{
    path: 'history-sales',
    component: HistorySalesComponent
}]

@NgModule({
    imports: [
        CommonModule, 
        BrowserAnimationsModule, 
        RouterModule.forChild(routes),
        NzDatePickerModule,
        NgSelectModule,
        FormsModule
    ],
    declarations: [HistorySalesComponent],
    providers: [],
    exports: [HistorySalesComponent]
})
export class HistorySalesModule {

}