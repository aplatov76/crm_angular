import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientInterface } from 'src/app/shared/interfaces/client.interface';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  getClients(): Observable<ClientInterface[]> {
    return this.http
      .get<ClientInterface[]>(`${environment.url}/client`)
      .pipe(map((items) => items));
  }

  createClient(client: ClientInterface): Observable<ClientInterface> {
    return this.http.post<ClientInterface>(
      `${environment.url}/client`,
      { client }
    );
  }

  updateClient(client: ClientInterface): Observable<ClientInterface> {
    return this.http.put<ClientInterface>(
      `${environment.url}/client`,
      { client }
    );
  }
}
