import {Injectable} from '@angular/core'
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterface } from '../../../../interfaces/user.interface';
import { Observable } from 'rxjs';
import {environment} from '../../../../../../environments/environment'

@Injectable()
export class AuthService{

    constructor(private http: HttpClient){

    }

    login(data: UserInterface): Observable<UserInterface> {

        console.log('data login: ', data)

        return this.http.post<UserInterface>(`${environment.url}/user/login`, {user: data});
    }

    getCurrentUser(): Observable<UserInterface>{
        return this.http.get<UserInterface>(environment.url + '/auth/user')
    }

}