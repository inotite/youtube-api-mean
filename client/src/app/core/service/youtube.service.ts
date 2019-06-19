import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey : string = 'AIzaSyC3amM6OUEJYcpC-L7bwYX0OYTfBZO1At0';

  constructor(public http: HttpClient) { }

  getVideosForChanel(channel, maxResults): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults;
    
    return this.http.get(url) .pipe(map((res) => {
        return res;
      }));
  }

  getInfoForVideo(video): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,status,statistics&key=' + this.apiKey + '&id=' + video.id.videoId;

    return this.http.get(url).pipe(map((res) => {
      return res;
    }));
  }
}