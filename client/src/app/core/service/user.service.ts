import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../domain/user.model';
import { ApiEndpointService } from './api-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    /**
     * Requests a list of yummy users from the API.
     */
    public getAll() : Observable<User[]> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.USERS);
        console.info(`getAll( Getting all users from API "${url}". )`);

        return this.http.get(url).pipe(
            map((response: any) => {
                var data = response.data;
                console.log(data);
                console.info(`getAllSuccess( Received all ${(data || []).length} users. )`);
                return data;
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`getAllFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }
}
