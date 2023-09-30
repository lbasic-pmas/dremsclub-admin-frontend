import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { SwalService } from 'src/app/services/swal.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formy: FormGroup = Object.create(null) ;
  remember = false;
  constructor(  private fb: FormBuilder ,
                private router: Router ,
                private _utilService : UtilService ,
                private _swalService : SwalService ,
                private _sessionService : SessionService ) {
    
  }

  ngOnInit(): void {
    this.formy = this.fb.group( {
      // admin@tecnoapps.cl
      // 12345678
      email: [ '' , Validators.compose([ Validators.required , Validators.email ])],
      password: [ '' , Validators.compose([ Validators.required ])],
    } );

    if ( localStorage.getItem( btoa( 'recordarCorreo' ) ) !== null )  {
      this.formy.controls.email.setValue( atob( String( localStorage.getItem( btoa( 'recordarCorreo' ) ) ) ) );
      this.remember = true;
    }
  }

  onSubmit(): void {
    let error = 0;
    if ( String( this.formy.controls.email.value ).trim() === '' || this.formy.controls.email.value === null ) {
      this.formy.controls.email.setErrors( { required: true } );
      error++;
    } else {
      
      let expr: any = this._utilService.getExpresion( 'correo' );
      if ( !expr.test( this.formy.controls.email.value ) ){
        this.formy.controls.email.setErrors( { email: true } );
        error++;
      } else {
        this.formy.controls.email.setErrors( null );
      }
    }
    
    if ( String( this.formy.controls.password.value ).trim() === '' || this.formy.controls.password.value === null ) {
      this.formy.controls.password.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.password.setErrors( null );
    }


    if ( error === 0 ) {
      this._swalService.verify();
      this._sessionService.login(
        String( this.formy.controls.email.value ).trim() ,
        String( this.formy.controls.password.value ).trim()
      ).subscribe(
        ( result: any ) => {
          this._swalService.close();
          if ( this.remember ) {
            localStorage.setItem( btoa( 'recordarCorreo' ) , btoa( String( this.formy.controls.email.value ).trim() ) );
          } else {
            localStorage.removeItem( btoa( 'recordarCorreo' ) );
          }
          this._sessionService.guardarUsuario( result );

          console.log( result );
          if ( result.data.user.id_rol === 2 ) {
            if ( !result.data.active_subscription ) {
              this._utilService.requestSubscription( true )
            } else if ( !result.data.active_payment ) {
              this._utilService.requestSubscription( false )
            }
          }

          this.router.navigate(['/pages/dashboard']);
        }, err => {
          this._swalService.errorMessage( err.error.message );
        }
      );
    }

  }

  changeStatus( event: any ) {
    this.remember = event.checked;
  }
}
