import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }
  getItem(token: string) {
    return localStorage.getItem(token);
  }
  clear() {
    localStorage.clear()
  }
}
