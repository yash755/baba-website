import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../global';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  constructor(private http: HttpClient) { }

  getGallery(): Observable<any> {
    const expURL = global.BASE_URL + global.GALLERY_URL;
    return this.http.get<any>(expURL);

  }
}
