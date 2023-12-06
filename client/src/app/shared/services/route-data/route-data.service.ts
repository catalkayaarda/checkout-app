import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteDataService {
  public data: any;

  constructor() {}

  readData() {
    return this.data;
  }

  createData(param: any) {
    this.data = param;
  }

  deleteData() {
    this.data = null;
  }
}
