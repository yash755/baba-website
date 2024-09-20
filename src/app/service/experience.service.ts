import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../global';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ExperienceService {

  constructor(private http: HttpClient) { }

  getExperiences(): Observable<any> {
    const expURL = global.BASE_URL + global.EXPERIENCE_URL;
    return this.http.get<any>(expURL);

  }
}
