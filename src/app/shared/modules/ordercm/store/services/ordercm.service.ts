import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';

@Injectable()
export class OrderCmService{

    constructor(private http: HttpClient){

    }

}