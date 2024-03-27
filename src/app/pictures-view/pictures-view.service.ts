import { Injectable } from '@angular/core';
import { environment } from '../../env/env.dev';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PictureModel } from './pictures.model';
import { ApiResult } from '../shared/model/common.model';

@Injectable({
  providedIn: 'root',
})
export class PicturesService {

  constructor(private http:HttpClient) { }

  getPictures(keyword:string){
    return this.http.get<ApiResult>(`${environment.apiUrl}/Pictures?keyword=${encodeURIComponent(keyword)}`)
  }

  addPicture(model:PictureModel){
		var body = JSON.stringify(model);
    var httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http.post<ApiResult>(`${environment.apiUrl}/Pictures`,body,httpOptions )
  }

}