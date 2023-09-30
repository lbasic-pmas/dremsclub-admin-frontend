import { Injectable } from '@angular/core';
import { CallService } from './call.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(  private _callService: CallService ) { }

  getPartners( pageSize: number , pageNum: number , filter: string ) {
    let pagination = `?page_size=${pageSize}&page_num=${pageNum}`;
    return this._callService.getQuery( `partner${pagination}${filter}` );
  }

  addPartner( nombre: string , apellidos: string , correo: string , pass: string , codTelefono: string , telefono: string , descripcion: string , avatar: string ) {
    const body = {
      name : nombre ,
      last_name : apellidos ,
      email : correo ,
      phone_code : codTelefono ,
      phone : telefono ,
      password : pass ,
      description : descripcion ,
      accept_terms : true ,
      avatar : avatar
    };
    return this._callService.postQuery( 'partner' , body );
  }

  editPartner( idPartner: number , nombre: string , apellidos: string , correo: string , pass: string , codTelefono: string , telefono: string , descripcion: string ) {
    const body = {
      name : nombre ,
      last_name : apellidos ,
      email : correo ,
      phone_code : codTelefono ,
      phone : telefono ,
      password : pass ,
      description : descripcion ,
      accept_terms : true
    };
    return this._callService.putQuery( `partner/${ idPartner }` , body );
  }

  getPartner( idPartner: number ) {
    return this._callService.getQuery( `partner/${ idPartner }` );
  }

  changeStatus( idPartner: number ) {
    const body = {};
    return this._callService.putQuery( `partner/${ idPartner }/status` , body );
  }

  changeStatusSuper( idPartner: number ) {
    const body = {};
    return this._callService.putQuery( `partner/${ idPartner }/super` , body );
  }

  addAccount( idPartner: number , bankId: number , type: number , number: string , name: string , rut: string ) {
    const body = {
      id_partner : idPartner ,
      name_account : name ,
      rut_account : rut ,
      id_bank : bankId ,
      number_account : number ,
      id_type_account : type
    };
    return this._callService.postQuery( 'partner/bankaccount' , body );
  }

  editAccount( idPartner: number , idAccount: number , bankId: number , type: number , number: string , name: string , rut: string ) {
    const body = {
      name_account : name ,
      rut_account : rut ,
      id_bank : bankId ,
      number_account : number ,
      id_type_account : type 
    };
    return this._callService.putQuery( `partner/${idPartner}/bankaccount/${idAccount}` , body );
  }
  
  principalAccount( idPartner: number , idAccount: number ) {
    const body = {};
    return this._callService.putQuery( `partner/${ idPartner }/bankaccount/${idAccount}/activate` , body );
  }

  deleteAccount( idPartner: number , idAccount: number ) {
    return this._callService.deleteQuery( `partner/${ idPartner }/bankaccount/${idAccount}` );
  }

  getBaseAccount() {
    return this._callService.getQuery( 'bank/banktypeccount' );
  }

  addAvatar( idPartner: number , avatar: string ) {
    const body = {
      avatar: avatar
    };
    return this._callService.putQuery( `partner/${idPartner}/avatar` , body );
  }

  changeStatusLast( idPartner: number ) {
    const body = {};
    return this._callService.putQuery( `partner/${ idPartner }/lastreservations` , body );
  }

  removeSuscription( idPartner: number ) {
    return this._callService.getQuery( `oneclick/canceledsuscription/{idPartner}`);
  }
}
