import { Injectable } from '@angular/core';
import { CallService } from './call.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  constructor( private _callService: CallService ,
                private _sessionService: SessionService ) { }


  start(  ) {
    const body: any = {};
    return this._callService.postQuery( 'mercadopago/suscribe' , body );
  }
}
