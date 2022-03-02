import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postVideo(data: any) {
    return this.http.post<any>("http://localhost:8080/api/video/save", data);
  }

  getVideos() {
    return this.http.get<any>("http://localhost:8080/api/video/all");
  }

  updateVideo(data: any, id: number) {
    return this.http.put<any>("http://localhost:8080/api/video/editar/" + id, data);
  }

  deleteVideo(id: number) {
    return this.http.delete<any>("http://localhost:8080/api/video/"+id);
  }
  
}
