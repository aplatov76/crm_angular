import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PersistanceService {
  constructor(private toastr: ToastrService) {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      this.toastr.error(`Ошибка записи ${key}`);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      this.toastr.error(`Ошибка чтения ${key}`);
    }
  }
}
