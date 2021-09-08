import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { ClientService } from '../../store/services/clients.service';
import { ClientInterface } from 'src/app/shared/interfaces/client.interface';
import { map, mergeMap } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'create-client-component',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.html']
})
export class CreateClientComponent implements OnInit, OnDestroy{

    form: FormGroup
    addSubscribe: Subscription
    @Input('customSubject$') customSubject$: Subject<ClientInterface[]>

    constructor(
        private fb: FormBuilder,
        private clientService: ClientService,
        private modalRef: NzModalRef
        ){
        
    }

    ngOnInit(){
        this.formInitialize();
    }

    ngOnDestroy(){
        if(this.addSubscribe)this.addSubscribe.unsubscribe()
    }

    formInitialize(){
        this.form = this.fb.group({
            fullname: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            passport_number: [''],
            passport_data: [''],
            passport_release: [''],
            register_address: [''],
            residence_address: ['', Validators.required],
            description: ['']
        })
    }

    submit(){

       this.addSubscribe = this.clientService.createClient(this.form.value).pipe(
           mergeMap((res) => this.clientService.getClients())
       ).subscribe(items => {
        this.customSubject$.next(items);
        this.modalRef.close()
       })//.unsubscribe();


    }

}