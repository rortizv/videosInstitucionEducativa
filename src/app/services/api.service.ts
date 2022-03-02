import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postVideo(data: any) {
    return this.http.post<any>("http://localhost:3000/videosList/", data);
  }

  getVideos() {
    return this.http.get<any>("http://localhost:3000/videosList/");
  }

  updateVideo(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/videosList/" + id, data);
  }

  deleteVideo(id: number) {
    return this.http.delete<any>("http://localhost:3000/videosList/" + id);
  }
  
}
