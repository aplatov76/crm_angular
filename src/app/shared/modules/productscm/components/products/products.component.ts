import { Component, Input, TemplateRef, ViewContainerRef,  OnInit} from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {environment} from '../../../../../../environments/environment';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';


@Component({
    selector: 'productscm',
    templateUrl: './products.component.html',
    styleUrls: ['products.component.css']
})
export class ProductsCmComponent implements OnInit{

    isCollapsed: boolean = false
    baseUrl: string = `${environment.url}/cm`;

    constructor(private modal: NzModalService){
        
    }


    ngOnInit(): void{

    }

    createTplModal(tplTitle: string, tplContent: TemplateRef<{}>): void {
        this.modal.create({
          nzTitle: tplTitle,
          nzContent: tplContent,
          nzMaskClosable: false,
          nzClosable: true,
          nzComponentParams: {
            value: 'Template Context'
          },
          nzFooter: [],
          nzStyle: { width: '80%' },
          nzAutofocus: null
        });
      }

      handleChange(info: NzUploadChangeParam): void {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
         // this.msg.success(`${info.file.name} file uploaded successfully`);
         console.log('file upload succesfull')
        } else if (info.file.status === 'error') {
          //this.msg.error(`${info.file.name} file upload failed.`);
          console.log('file upload error')
        }
      }

}