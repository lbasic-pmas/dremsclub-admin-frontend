import { Injectable } from '@angular/core';
import { CallService } from './call.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(  private _callService: CallService ) { }

  getAll() {
    return this._callService.getQuery( 'category' );
  }
}
