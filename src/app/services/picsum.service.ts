import { Injectable } from '@angular/core';
import { PhotoData } from '../model/photoData.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PicsumService {
  constructor(private http: HttpClient) {}

  getAllPhotosDataFromJson() {
    return this.http.get<PhotoData[]>('/assets/data/picsum.json');
  }
}
