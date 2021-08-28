import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription } from "rxjs";
import { DatePipe } from '@angular/common';
import { ClientInterface } from "src/app/shared/interfaces/client.interface";
import { ClientService } from "../../store/services/clients.service";

@Component({
    selector: 'update-client-component',
    templateUrl: './update.component.html'
})
export class UpdateClientComponent implements OnInit, OnDestroy{

    form: FormGroup
    updateSub$: Subscription
    @Input('client') client: ClientInterface

    constructor(
        private fb: FormBuilder,
        private modalRef: NzModalRef,
        private datepipe: DatePipe,
        private clientService: ClientService
    ){

    }

    ngOnInit(): void{

        this.initializeForm()

    }

    ngOnDestroy(){
        if(this.updateSub$)this.updateSub$.unsubscribe();
    }

    initializeForm(){
        //console.log(this.client)
        //console.log(new Date(this.client.passport_data))
        this.form = this.fb.group({
            id: [this.client.id, Validators.required],
            fullname: [this.client.fullname, [Validators.required]],
            phone: [this.client.phone, [Validators.required]],
            passport_number: [this.client.passport_number],
            passport_data: [this.datepipe.transform(this.client.passport_data, 'yyyy-MM-dd')],
            passport_release: [this.client.passport_release],
            register_address: [this.client.register_address],
            residence_address: [this.client.residence_address, Validators.required],
            description: [this.client.description]
        })
    }

    submit(){
        this.updateSub$ = this.clientService.updateClient(this.client).subscribe(item => {
            this.modalRef.close();
        })
    }
}