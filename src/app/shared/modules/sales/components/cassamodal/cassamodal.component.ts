import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { addCassaAction } from '../../store/actions/action';

@Component({
  selector: 'cassa-modal',
  templateUrl: './cassamodal.template.html'
})
export class CassaModalComponent {
  sum: number = 0;

  constructor(private store: Store, private modal: NzModalRef) {}

  saveCurrentSum(): void {
    this.store.dispatch(addCassaAction({ sum: this.sum }));
    this.modal.close();
  }
}
