import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import { BehaviorSubject, Observable, pipe, Subject, Subscription } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { ClientInterface } from 'src/app/shared/interfaces/client.interface';
import { ClientService } from '../../store/services/clients.service';
import { CreateClientComponent } from '../create/create.component';
import { switchMap } from 'rxjs/operators';
import { UpdateClientComponent } from '../update/update.component';

@Component({
    selector: 'clients-component',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy{

    clients$: Observable<ClientInterface[]>
    clientsSub: Subscription
    customSubject$: Subject<ClientInterface[]> = new Subject();//BehaviorSubject<ClientInterface[]>(null);
    visible: boolean = false

    constructor(
        private clientService: ClientService,
        private modalService: NzModalService,
        private viewContainerRef: ViewContainerRef
        ){

    }

    ngOnInit(): void{
       // this.clients$.
       //this.clientService.getClients();
     // this.clients$ = this.refreshClients$.pipe(switchMap(_ => this.clientService.getClients()))
     // this.clients$ = this.refreshClients$,pipe(switchMap(_ => this.clientService.getClients()))
     
      this.clientsSub = this.clientService.getClients().subscribe(items => {
        //console.log(items)
        this.customSubject$.next(items)
      })

       //this.clientService.subject.subscribe(item => console.log(item))
    }

    ngOnDestroy(){
        this.clientsSub.unsubscribe()
    }

    openUpdateClient(client: ClientInterface){

        this.modalService.create({
            nzTitle: `${client.fullname}`,
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
              //id: id
              client: client
            },
            nzFooter: [],
            nzStyle: { width: '80%' },
            nzAutofocus: null,
            nzContent: UpdateClientComponent
        })

    }

    openCreateClient(): void{
        
        this.modalService.create({
            nzTitle: 'Cоздание нового клиента',
            nzViewContainerRef: this.viewContainerRef,
            nzComponentParams: {
              //id: id
              customSubject$: this.customSubject$
            },
            nzFooter: [],
            nzStyle: { width: '80%' },
            nzAutofocus: null,
            nzContent: CreateClientComponent
        })
    }

}