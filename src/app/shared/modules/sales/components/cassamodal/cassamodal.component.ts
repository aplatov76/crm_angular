import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { addCassaAction } from '../../store/actions/action';
@Component({
    selector: 'cassa-modal',
    templateUrl: './cassamodal.template.html'
})
export class CassaModalComponent {

    sum: number = 0

    constructor(private store: Store, public modalService: BsModalService){

    }

    saveCurrentSum(): void{
        console.log(this.sum)
        this.store.dispatch(addCassaAction({sum: this.sum}));
        this.modalService.hide()
    }

}