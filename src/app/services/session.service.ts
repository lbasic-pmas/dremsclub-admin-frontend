import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CallService } from './call.service';
import { SwalService } from './swal.service';
import { UtilService } from './util.service';



@Injectable({
  providedIn: 'root'
})
export class SessionService {
  estadoSesion$ = new EventEmitter<boolean>();
  token: any;

  constructor( private _callService: CallService ,
               private _swalService: SwalService ,
               private _utilService : UtilService ,
               private router: Router ) {}

  getUser() : any {
    return this.decodificarUser();
  }

  decodificarUser() {
    let userTemp = JSON.parse( atob( String( localStorage.getItem( btoa( 'usuario' ) ) ) ) );
    return userTemp;
  }

  login( email: string , pass: string ) {
    const body = {
      email : email , 
      password : pass
    };
    return this._callService.postQuery( 'authadmin/login' , body );
  }

  loginGoogle( token: string ) {
    const body = {
      credential: token
    };
    return this._callService.postQuery( 'auth/singIn' , body ); 
  }

  register( nombre: string , apellido: string , correo: string , pass: string , idCountry: number ) {
    const body = {
      name : nombre ,
      last_name : apellido ,
      email : correo ,
      password : pass ,
      id_country: idCountry ,
      accept_terms : true
    };
    return this._callService.postQuery( 'user' , body ); 
  }

  guardarUsuario( result: any ) {
    localStorage.setItem( btoa( 'existeSesion' ) , btoa( 'yes' ) );
    localStorage.setItem( btoa( 'token' ) , result.data.token );
    result.data.user.AVATAR = this._utilService.generarAvatar( result.data.user.name.slice(0) , result.data.user.name.slice(1) )
    localStorage.setItem( btoa( 'usuario' ) , btoa( JSON.stringify( result.data.user ) ) );
    this._swalService.alertSuccess('Sesión iniciada');
    this.estadoSesion$.emit( true );
  }

  removeSesion() {
    localStorage.removeItem( btoa( 'token' ) );
    localStorage.setItem( btoa( 'existeSesion' ) , btoa( 'no' ) );
    this.estadoSesion$.emit( false );
    this.router.navigateByUrl( '/' );
  }

  consultaSesion() {
    return atob( String( localStorage.getItem( btoa( 'existeSesion' ) ) ) ) === 'yes' ? true : false;
  }

  recovery( email: string ) {
    const body = {
      email : email
    };
    return this._callService.postQuery( 'authadmin/recovery' , body ); 
  }
  
  verifyToken ( token: string ) {
    return this._callService.getQuery( `authadmin/validatetoken/${token}` );
  }
  changePasswordToken( password: string , token: string ) {
    const body = {
      password : password
    };
    return this._callService.putQuery( `authadmin/change/${token}` , body );
  }
}
