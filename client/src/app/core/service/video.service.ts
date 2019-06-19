import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Observable,
  throwError
} from "rxjs";
import {
  catchError,
  map
} from "rxjs/operators";
import { Video } from "../domain/video.model";
import { ApiEndpointService } from "./api-endpoint.service";

@Injectable({
  providedIn: "root"
})
export class VideoService {
  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Requests a list of yummy videos from the API.
   */
  public getAll(): Observable<Video[]> {
      const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.VIDEO);
      console.info(`getAll( Getting all videos from API "${url}". )`);

      return this.http.get(url).pipe(
          map((response: Video[]) => {
              console.info(`getAllSuccess( Received all ${(response || []).length} videos. )`);
              return response;
          }),
          catchError((fault: HttpErrorResponse) => {
              console.warn(`getAllFault( ${fault.message} )`);
              return throwError(fault);
          })
      );
  }
}
