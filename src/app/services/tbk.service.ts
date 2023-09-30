import { Injectable } from '@angular/core';
import { CallService } from './call.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class TbkService {

  constructor(  private _callService: CallService ,
                private _sessionService: SessionService ) { }


  start(  ) {
    const body: any = {
      email: this._sessionService.getUser().email ,
      user: this._sessionService.getUser().email
    };
    return this._callService.postQuery( 'oneclick/start' , body );
  }

  getStatus( id: any ) {
    return this._callService.getQuery( `oneclick/consult/${id}` );
  }
}
