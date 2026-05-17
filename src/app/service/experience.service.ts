import { Injectable, makeStateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../global';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const EXPERIENCES_KEY = makeStateKey<any>('experiences');

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient, private transferState: TransferState) {}

  getExperiences(): Observable<any> {
    if (this.transferState.hasKey(EXPERIENCES_KEY)) {
      const cached = this.transferState.get(EXPERIENCES_KEY, null);
      this.transferState.remove(EXPERIENCES_KEY);
      return of(cached);
    }
    const url = global.BASE_URL + global.EXPERIENCE_URL;
    return this.http.get<any>(url).pipe(
      tap(data => this.transferState.set(EXPERIENCES_KEY, data))
    );
  }

  getDetailExperience(id: string): Observable<any> {
    const key = makeStateKey<any>(`experience_${id}`);
    if (this.transferState.hasKey(key)) {
      const cached = this.transferState.get(key, null);
      this.transferState.remove(key);
      return of(cached);
    }
    const url = global.BASE_URL + global.EXPERIENCE_URL + '/' + id;
    return this.http.get<any>(url).pipe(
      tap(data => this.transferState.set(key, data))
    );
  }
}
