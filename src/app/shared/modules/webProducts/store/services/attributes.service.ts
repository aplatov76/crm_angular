import {Injectable} from '@angular/core'
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import { ProductsInterface } from '../../interfaces/products.interface';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { AttributesInterface } from '../../../../interfaces/attributes.interface';

@Injectable()
export class WebAttributesService{

    constructor(private http: HttpClient){

    }

    getAllAttributes(): Observable<AttributesInterface[]> {
        return this.http.post<AttributesInterface[]>(`${environment.url}/web/attributes`, {});
    }

    getAttribute(id: number): Observable<AttributesInterface>{
        return this.http.post<AttributesInterface>(`${environment.url}/web/attribute`, {id});
    }

    saveAttribute(attribute: AttributesInterface): Observable<any>{
        console.log(attribute)
        return this.http.post<AttributesInterface>(`${environment.url}/web/attribute/save`, {attribute});
    }

}