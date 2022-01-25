import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../../../../interfaces/user.interface';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(
      `${environment.url}/user/login`,
      { user: data }
    );
  }

  getCurrentUser(): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${environment.url}/user`);
  }
}
