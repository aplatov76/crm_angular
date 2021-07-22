import { ChangeDetectorRef, Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { isGroupsProduct, isAttributesList} from '../../store/selectors';
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { productGroups,attributes, productInsertUpdate } from '../../store/actions/action';

import { ProductInterface } from "../../../../interfaces/product.interface";
import { AttributesInterface } from "src/app/shared/interfaces/attributes.interface";
import {GroupsInterface} from '../../interfaces/groups.interface';

@Component({
    selector: 'web-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class WebGroupComponent implements OnInit, OnDestroy{

    
    form: FormGroup = null
    id: number
    groupsSub: Subscription
    attributesSub: Subscription
    groups: GroupsInterface[]
    attributes: AttributesInterface[] = null
    /*true - группа false - позиция */
    view: boolean = true

    labelImg: string = null
    file: any

    colors = [
        {id : 1, title: '#e322d2', description: 'Желтый'},
        {id : 2, title: '#f90s32', description: 'Красный'}
    ]

    constructor(private fb: FormBuilder, private store: Store, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef){

    }

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'))
        this.store.dispatch(productGroups());
        this.store.dispatch(attributes());

        this.initializeForm()
        this.initializeSubscription()
    }

    ngOnDestroy(){
        this.groupsSub.unsubscribe();
        this.attributesSub.unsubscribe();
    }

    initializeForm(){
        this.form = this.fb.group({
            title: new FormControl(null, Validators.required),
            id: [null],
            articul: [null, [Validators.required, Validators.maxLength(20)]],
            price: [null],
            trade_price: [null],
            parent: [this.id, [Validators.required]],
            visible: [null, [Validators.required]],
            color: [null],
            img_url: [null],
            attribute_id: [null],
            info: [null]
        })
    }

    initializeSubscription(){
        this.groupsSub = this.store.pipe(select(isGroupsProduct), filter(Boolean)).subscribe(
            ((items: GroupsInterface[]) => {
                  this.groups = items
            })
        )

        this.attributesSub = this.store.pipe(select(isAttributesList), filter(Boolean))
        .subscribe((items: AttributesInterface[]) => {
            console.log('attributes: ',items)
            this.attributes = items
        })
            
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
            // need to run CD since file load runs outside of zone
            this.labelImg = event.target.files[0].name;
            this.cd.markForCheck();
          };
        }
    }


    submit(){
        let formData: FormData = new FormData();

        console.log(this.form.value);

        for(const name in this.form.value)if(this.form.value[name] !== null)formData.append(name, this.form.value[name]);
         
        if(this.file === undefined)formData.set('img_url', this.labelImg);
            else formData.set('img_url', this.file[0]);


        this.store.dispatch(productInsertUpdate({product: formData}));
        
    }
}