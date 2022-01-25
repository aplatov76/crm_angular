import {
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ClientInterface } from 'src/app/interfaces/client.interface';
import { ClientService } from '../../store/services/clients.service';
import { CreateClientComponent } from '../create/create.component';
import { UpdateClientComponent } from '../update/update.component';

@Component({
  selector: 'clients-component',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients$: Observable<ClientInterface[]>;

  clientsSub: Subscription;

  customSubject$: Subject<ClientInterface[]> = new Subject();

  visible: boolean = false;

  constructor(
    private clientService: ClientService,
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.clientsSub = this.clientService
      .getClients()
      .subscribe((items) => {
        this.customSubject$.next(items);
      });
  }

  ngOnDestroy() {
    this.clientsSub.unsubscribe();
  }

  openUpdateClient(client: ClientInterface) {
    this.modalService.create({
      nzTitle: `${client.fullname}`,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        // id: id
        client
      },
      nzFooter: [],
      nzStyle: { width: '80%' },
      nzAutofocus: null,
      nzContent: UpdateClientComponent
    });
  }

  openCreateClient(): void {
    this.modalService.create({
      nzTitle: 'Cоздание нового клиента',
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        // id: id
        customSubject$: this.customSubject$
      },
      nzFooter: [],
      nzStyle: { width: '80%' },
      nzAutofocus: null,
      nzContent: CreateClientComponent
    });
  }
}
