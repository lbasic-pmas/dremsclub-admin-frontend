import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { SwalService } from 'src/app/services/swal.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  public formy: FormGroup = Object.create(null) ;
  statusCheck = false;
  resultValidate = false;
  statusSend = false;
  token: any = '';
  constructor(  private fb: FormBuilder,
                private router: Router ,
                private _utilService : UtilService ,
                private _swalService : SwalService ,
                private _sessionService : SessionService ) {


    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.token = urlParams.get('token');
      if ( this.token !== '' ) {
        this.validarToken();
      } else {
        this.router.navigateByUrl( '' );
      }
    } catch (error) {}
  }

  ngOnInit(): void {
    this.formy = this.fb.group( {
      password: [ '' , Validators.compose([ Validators.required , Validators.minLength(8) ])] ,
      repassword: [ '' , Validators.compose([ Validators.required ])] 
    } );
  }

  validarToken() {
    this._swalService.verify();
    this._sessionService.verifyToken(
      this.token
    ).subscribe(
      ( result: any ) => {
        this.resultValidate = result.data.validate;

        this.statusCheck = true;

        if ( !this.resultValidate ) {
          setTimeout(() => {
            this.router.navigateByUrl( '' );
          }, 5000);
        }

        this._swalService.close();
      }, err => {
        this._swalService.errorMessage( err.error.message );
      }
    );
  }

  onSubmit(): void {
    let error = 0;

    if ( String( this.formy.controls.password.value ).trim() === '' || this.formy.controls.password.value === null ) {
      this.formy.controls.password.setErrors( { required: true } );
      error++;
    } else {
      if ( String( this.formy.controls.password.value ).trim().length < 8 ) {
        this.formy.controls.password.setErrors( { minlength: true } );
        error++;
      } else {
        
      }
    }

    if ( String( this.formy.controls.repassword.value ).trim() === '' || this.formy.controls.repassword.value === null ) {
      this.formy.controls.repassword.setErrors( { required: true } );
      error++;
    } else {
      if ( String( this.formy.controls.password.value ).trim() !== String( this.formy.controls.repassword.value ).trim() ) {
        this.formy.controls.repassword.setErrors( { notEqual: true } );
        error++;
      } else {
        
      }
    }

    if ( error === 0 ) {
      this._swalService.verify();
      this._sessionService.changePasswordToken(
        String( this.formy.controls.password.value ).trim() ,
        this.token
      ).subscribe(
        ( result: any ) => {
          this._swalService.close();  
          this.router.navigateByUrl( '' );
          this._swalService.alertSuccess('Contraseña cambiada con éxito');
        }, err => {
          this._swalService.errorMessage( err.error.message );
        }
      );
    }
  }

}
