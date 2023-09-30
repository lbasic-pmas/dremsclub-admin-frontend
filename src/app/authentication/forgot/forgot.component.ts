import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { UtilService } from 'src/app/services/util.service';
import { SwalService } from 'src/app/services/swal.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  public formy: FormGroup = Object.create(null) ;
  statusSend = false;
  constructor(  private fb: FormBuilder,
                private router: Router ,
                private _utilService : UtilService ,
                private _swalService : SwalService ,
                private _sessionService : SessionService ) {}

  ngOnInit(): void {
    this.formy = this.fb.group( {
      email: [ '' , Validators.compose([ Validators.required , Validators.email ])]
    } );
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

    if ( error === 0 ) {
      this._swalService.verify();
      this._sessionService.recovery(
        String( this.formy.controls.email.value ).trim()
      ).subscribe(
        ( result: any ) => {
          this.statusSend = true;
          this._swalService.close();
        }, err => {
          this._swalService.errorMessage( err.error.message );
        }
      );
    }
  }
}
