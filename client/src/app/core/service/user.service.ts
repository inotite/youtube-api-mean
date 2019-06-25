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
     * Requests a list of users from the API.
     */
    public getAll() : Observable<User[]> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.USERS);
        console.info(`getAll( Getting all users from API "${url}". )`);

        return this.http.get(url).pipe(
            map((response: any) => {
                console.info(`getAllSuccess( Received all ${(response || []).length} users. )`);
                let mod = [];
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                response.forEach(element => {
                    let date = new Date(Date.parse(element.created_at));
                    element.created_at = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
                    mod.push(element);
                });
                return mod;
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`getAllFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }

    public getOne(_id) : Observable<User> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.USER + _id);
        console.info(`getOne( Getting a user from API "${url}". )`);

        return this.http.get(url).pipe(
            map((response: User) => {
                console.log(response);
                console.info(`getOneSuccess( Received ${response} user. )`);
                return response;
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`getOneFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }

    public updateOne(user: User) : Observable<User> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.USER + user._id);
        console.info(`updateOne( Update a user from API "${url}". )`);

        return this.http.patch(url, user).pipe(
            map((response: User) => {
                console.log(response);
                console.info(`updateOneSuccess( Received ${response} user. )`);
                return response;
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`updateOneFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }

    public deleteOne(_id: string) {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.USER + _id);
        console.info(`deleteOne( Delete a user from API "${url}". )`);

        return this.http.delete(url).pipe(
            map((response: any) => {
                console.log(response);
                console.info(`deleteOneSuccess( Deleted ${response} user. )`);
                return response;
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`deleteOneFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Requests to add a user from the API.
     */
    public add(user: User) : Observable<User> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.USERS);
        console.info(`add( Add a new user from API "${url}". )`);

        return this.http.post<User>(url, user ).pipe(
            map((response: User) => {
                console.log(response);
                console.info(`addSuccess( response: ${response})`);
                return response;
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`getAllFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }

}
