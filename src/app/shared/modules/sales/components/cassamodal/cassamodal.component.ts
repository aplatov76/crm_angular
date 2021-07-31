import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { addCassaAction } from '../../store/actions/action';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'cassa-modal',
    templateUrl: './cassamodal.template.html'
})
export class CassaModalComponent {

    sum: number = 0

    constructor(private store: Store, private modal: NzModalRef){

    }

    saveCurrentSum(): void{
        console.log(this.sum)
        this.store.dispatch(addCassaAction({sum: this.sum}));
        this.modal.close();
    }

}