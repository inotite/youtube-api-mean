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
  map,
  switchMap
} from "rxjs/operators";
import { Video } from "../domain/video.model";
import { ApiEndpointService } from "./api-endpoint.service";
import { YoutubeService } from './youtube.service';

@Injectable({
  providedIn: "root"
})
export class VideoService {
  /**
   * Constructor.
   */
  constructor(private http: HttpClient, private youtube: YoutubeService) {
  }

  /**
   * Requests a list of yummy videos from the API.
   */
  public getAll(): Observable<Video[]> {
      const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.VIDEOS);
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

  public getOne(_id) : Observable<Video> {
      const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.VIDEO + _id);
      console.info(`getOne( Getting a video from API "${url}". )`);

      return this.http.get(url).pipe(
          map((response: Video) => {
              console.log(response);
              console.info(`getOneSuccess( Received ${response} video. )`);
              return response;
          }),
          catchError((fault: HttpErrorResponse) => {
              console.warn(`getOneFault( ${fault.message} )`);
              return throwError(fault);
          })
      );
  }

  /**
   * Requests to add a vidoe from the API.
   */
  public addOne(video: Video) : Observable<Video> {
      const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.VIDEOS);
      console.info(`add( Add a new video from API "${url}". )`);

      return this.youtube.getInfoForVideo(video.video_id)
        .pipe(switchMap(res => {
          console.log(res);
          let item = res['items'][0];
          video.description = item['snippet']['description'];
          video.title = item['snippet']['title'];
          video.published_at = item['snippet']['publishedAt'];
          video.comment_count = item['statistics']['commentCount'];
          video.duration = item['contentDetails']['duration'];
          video.dislikes = item['statistics']['dislikeCount'];
          video.likes = item['statistics']['likeCount'];
          video.total_views = item['statistics']['viewCount'];
          video.tags = "";
          for (let tag of item['snippet']['tags']) 
            video.tags = video.tags + tag + ", ";

          return this.http.post<Video>(url, video).pipe(
            map((response: Video) => {
                console.log(response);
                console.info(`addSuccess( response: ${response})`);
                return response;
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`getAllFault( ${fault.message} )`);
                return throwError(fault);
            }));
        }));
  }

  public deleteOne(_id: string) {
      const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.VIDEO + _id);
      console.info(`deleteOne( Delete a video from API "${url}". )`);

      return this.http.delete(url).pipe(
          map((response: any) => {
              console.log(response);
              console.info(`deleteOneSuccess( Deleted ${response} video. )`);
              return response;
          }),
          catchError((fault: HttpErrorResponse) => {
              console.warn(`deleteOneFault( ${fault.message} )`);
              return throwError(fault);
          })
      );
  }
}
