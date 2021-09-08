import { Component, Input, TemplateRef, ViewContainerRef,  OnInit, OnDestroy} from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {FormControl} from '@angular/forms';
import {environment} from '../../../../../../environments/environment';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ProductsCmInterface } from '../../interfaces/productscm.interface';
import { Store, select } from '@ngrx/store';
import { productsCmAction } from '../../store/actions/action';
import { Observable, Subscription } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import {isProductsCmList, isLoadingProductsCmList} from '../../store/selectors';
import { ProductsCmService } from '../../store/services/productscm.service';
import { CurrentCmProductComponent } from '../current/current.component';
import { ProductCmInterface } from '../../interfaces/productcm.interface';


@Component({
    selector: 'productscm',
    templateUrl: './products.component.html',
    styleUrls: ['products.component.css']
})
export class ProductsCmComponent implements OnInit, OnDestroy{

    isCollapsed: boolean = false
    baseUrl: string = `${environment.url}/cm`;
    searchValue: string = ''
    currentDocument = {id: null, show: false}
    search = new FormControl();
    private viewContainerRef: ViewContainerRef

    productscm$: Subscription
    productsLoading$: Observable<Boolean>
    nodes: ProductsCmInterface[]
    root: Observable<any>
    modelChanged: Subject<string> = new Subject<string>();

    constructor(
      private modal: NzModalService,
      private cmService: ProductsCmService,
      private toastservice: ToastrService,
      private store: Store
      ){
        
    }

    ngOnInit(): void{
      //
      this.initializeSubscription()
    }

    ngOnDestroy(){
      this.productscm$.unsubscribe();

      this.modelChanged.next(null);
      this.modelChanged.complete();
    }

    nzClick(index){
      
      if(this.currentDocument.id === index){
        this.nodes = null;
        this.currentDocument = {id: null, show: false};
        return;
      }

      this.store.dispatch(productsCmAction({query: {parent: `${index}`}}));
      this.currentDocument = {id: index, show: !this.currentDocument.show};
    }

    showSelectProduct(index: number){

      const currentProduct: ProductCmInterface = this.nodes[index];

      if(!currentProduct.articul){
        this.toastservice.error('Это категория');
        return;
      }

      this.modal.create({
        nzTitle: currentProduct.title,
        nzViewContainerRef: this.viewContainerRef,
        nzComponentParams: {
          product: currentProduct
        },
        nzFooter: [],
        nzStyle: { width: '80%' },
        nzAutofocus: null,
        nzContent: CurrentCmProductComponent
      });
    }

    nzCheck($event){

    }

    nzOpen($event){

    }

    initializeSubscription(){

      this.root = this.cmService.getProducts({parent: 'root'})
      
      this.productscm$ = this.store.pipe(select(isProductsCmList), filter(Boolean)).subscribe(
        (items: ProductsCmInterface[]) => {
          //console.log('items: ',items)
          this.nodes = items.map(item => ({...item, visible: true}))//cloneDeep(items[0].children)
          //this.expandedNodeList = [...this.expandedNodeList]
        }
      )
      this.productsLoading$ = this.store.pipe(select(isLoadingProductsCmList));

      this.modelChanged.pipe(
          debounceTime(300),
          distinctUntilChanged())
          .subscribe(model => {
            this.searchValue = model
            if(this.nodes)this.nodes = this.nodes.map(item => ((item.title.toLowerCase()).includes(this.searchValue)) ? ({...item, visible: true}) : ({...item, visible: false}))
          });
      
    }

    onChange(text: string){
      //console.log(text)
      //this.nodes = this.nodes.map(item => ((item.title.toLowerCase()).includes(this.searchValue)) ? ({...item, visible: true}) : ({...item, visible: false}))
      this.modelChanged.next(text);
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

        console.log('info:' , info)
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