import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {attributes, productAction, productDelete, productInsertUpdate } from '../../store/actions/action';
import { isGroupsProduct, isAttributesList} from '../../store/selectors';
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import { ProductInterface } from "../../../../interfaces/product.interface";
import {GroupsInterface} from '../../interfaces/groups.interface';
import {isCurrentProduct} from '../../store/selectors';

import { productGroups } from '../../store/actions/action';
import { AttributesInterface } from "src/app/shared/interfaces/attributes.interface";


@Component({
    selector: 'web-product-component',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class WebProductComponent implements OnInit, OnDestroy{

    @ViewChild('lfile', { static: false }) fileLabel: ElementRef;
    form: FormGroup = null
    labelImg: string = null
    id: number
    currentProduct: Subscription
    attributesSub: Subscription
    groupsSub: Subscription

    file: any

    groups: GroupsInterface[]
    attributes: AttributesInterface[] = null

    casing = [
        {id : 1, title: 'МДФ'},
        {id : 2, title: 'ПВХ'},
        {id : 3, title: 'Термопленка'},
        {id : 4, title: 'ХДФ'},
    ];

    colors = [
        {id : 1, title: '#e322d2', description: 'Желтый'},
        {id : 2, title: '#f90s32', description: 'Красный'}
    ]

    //groupsQuery = []

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private store: Store, private cd: ChangeDetectorRef){

    }

    ngOnInit(): void {

        this.id = parseInt(this.route.snapshot.paramMap.get('id'))
        this.store.dispatch(productGroups());
        this.store.dispatch(attributes());
        
        //this.initializeForm()
        if(this.id){
            this.store.dispatch(productAction({id: this.id}))
            this.initializeSubscription()
        }
    }

    ngOnDestroy(): void {

        this.groupsSub.unsubscribe();
        this.currentProduct.unsubscribe();
        this.attributesSub.unsubscribe();

    }

    initializeSubscription(){
        this.currentProduct = this.store.pipe(select(isCurrentProduct), filter(Boolean))
            .subscribe((item: ProductInterface) => this.initializeForm(item))

        this.groupsSub = this.store.pipe(select(isGroupsProduct), filter(Boolean)).subscribe(
            ((items: GroupsInterface[]) => {
                  this.groups = items
            })
        )

        this.attributesSub = this.store.pipe(select(isAttributesList), filter(Boolean))
            .subscribe((items: AttributesInterface[]) => {
                console.log('items: ',items)
                this.attributes = items
            })


    }

    //`id`, `articul`, `title`, `visible`, `stock`, `price`, `trade_price`, `parent
    initializeForm(item: ProductInterface){

        console.log('forms item: ', item)

        //this.groupsQuery.push({id: 0, current: item.parent})

        /*
            //web products
            only_box?: boolean,
            mass?: number,
            in_box?: number,
            width?: number,
            height?: number,
            lenght?: number,
            builder?: string,
            casing?: number
        */

       // if(item.price === null){
            this.labelImg = item.img_url;
            this.form = this.fb.group({
                title: new FormControl(item.title, Validators.required),
                id: [item.id, [Validators.required]],
                articul: [item.articul, [Validators.required]],
                price: [item.price, [Validators.required]],
                trade_price: [item.trade_price, [Validators.required, Validators.min(1), Validators.max(6)]],
                parent: [item.parentId, [Validators.required]],
                visible: [item.visible, [Validators.required]],
                color: [item.color],
                img_url: [null],
                attribute_id: [item.attribute_id, [Validators.required]],
                info: [item.info]
                
            });
       // }
       // else {
            //console.log(this.form.controls['price'].value)

      //  }

        //this.fileLabel.nativeElement.innerHTML = item.img_url;

    }

    onFileChange(event) {
        let reader = new FileReader();
        //console.log(event.target.files[0].name)
        if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;

          this.file = event.target.files;
          reader.readAsDataURL(file);
        
          reader.onload = () => {
            this.form.patchValue({
              img_url: event.target.files[0].name//reader.result
            });
            this.fileLabel.nativeElement.innerHTML = event.target.files[0].name;
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
        }
    }

    remove(){
        this.store.dispatch(productDelete({id: this.id}));
        this.router.navigate(['/webproducts']);
    }

    submit(){
        
        //console.log(this.file)

        let formData: FormData = new FormData();

        console.log(this.form.value);

        for(const name in this.form.value)if(this.form.value[name] !== null)formData.append(name, this.form.value[name]);
         
        if(this.file === undefined)formData.set('img_url', this.labelImg);
            else formData.set('img_url', this.file[0]);


        this.store.dispatch(productInsertUpdate({product: formData}));
        this.router.navigate(['/webproducts']);
        
    }
}