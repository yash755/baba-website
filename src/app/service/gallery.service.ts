import { Injectable, makeStateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../global';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const GALLERY_KEY = makeStateKey<any>('gallery');

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient, private transferState: TransferState) {}

  getGallery(): Observable<any> {
    if (this.transferState.hasKey(GALLERY_KEY)) {
      const cached = this.transferState.get(GALLERY_KEY, null);
      this.transferState.remove(GALLERY_KEY);
      return of(cached);
    }
    const url = global.BASE_URL + global.GALLERY_URL;
    return this.http.get<any>(url).pipe(
      tap(data => this.transferState.set(GALLERY_KEY, data))
    );
  }
}
