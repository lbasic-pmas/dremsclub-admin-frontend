import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from '../../../services/partner.service';
import { UtilService } from '../../../services/util.service';
import { SwalService } from '../../../services/swal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent implements OnInit {
  formy: any;
  listCodeCountry: any = [
    '+569' ,
    '+562'
  ];
  constructor(  public dialogRef: MatDialogRef<PartnerAddComponent> ,
                private _partnerService: PartnerService ,
                private _utilService: UtilService ,
                private _swalService: SwalService ,
                private _sessionService : SessionService ) {
    this.formy = new FormGroup({
      name: new FormControl( '' , [ Validators.required , Validators.minLength(3) ] ) ,
      lastName: new FormControl( '' , [ Validators.required ] ) ,
      email: new FormControl( '' , [ Validators.required , Validators.email ] ) ,
      password: new FormControl( '' , [ Validators.required , Validators.minLength(6) ] ),
      codeCountry: new FormControl( '' , [ Validators.required ] ) ,
      phone: new FormControl( '' , [ Validators.required ] ) ,
      description: new FormControl( '' , [ Validators.required ] ),
    });
  }

  ngOnInit(): void {
  }

  send( form: FormGroup ) {
    let error = 0;
    if ( String( this.formy.controls.name.value ).trim() === '' || this.formy.controls.name.value === null || String( this.formy.controls.name.value ).trim().length < 3 ) {
      this.formy.controls.name.setErrors( { required: true } );
      if ( String( this.formy.controls.name.value ).trim().length < 3 ) {
        this.formy.controls.name.setErrors( { minlength: true } );
      }
      error++;
    } else {
      this.formy.controls.name.setErrors();
    }

    if ( String( this.formy.controls.lastName.value ).trim() === '' || this.formy.controls.lastName.value === null ) {
      this.formy.controls.lastName.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.lastName.setErrors();
    }

    if ( String( this.formy.controls.email.value ).trim() === '' || this.formy.controls.email.value === null ) {
      this.formy.controls.email.setErrors( { required: true } );
      error++;
    } else {
      let expr: any = this._utilService.getExpresion( 'correo' );
      if ( !expr.test( this.formy.controls.email.value ) ){
        this.formy.controls.email.setErrors( { email: true } );
        error++;
      } else {
        this.formy.controls.email.setErrors();
      }
    }

    if ( String( this.formy.controls.password.value ).trim() === '' || this.formy.controls.password.value === null || String( this.formy.controls.password.value ).trim().length < 6 ) {
      this.formy.controls.password.setErrors( { required: true } );
      if ( String( this.formy.controls.password.value ).trim().length < 6 ) {
        this.formy.controls.password.setErrors( { minlength: true } );
      }
      error++;
    } else {
      this.formy.controls.password.setErrors();
    }

    if ( String( this.formy.controls.codeCountry.value ).trim() === '' || this.formy.controls.codeCountry.value === null ) {
      this.formy.controls.codeCountry.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.codeCountry.setErrors();
    }

    if ( String( this.formy.controls.phone.value ).trim() === '' || this.formy.controls.phone.value === null ) {
      this.formy.controls.phone.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.phone.setErrors();
    }

    if ( String( this.formy.controls.description.value ).trim() === '' || this.formy.controls.description.value === null ) {
      this.formy.controls.description.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.description.setErrors();
    }

    if ( error === 0 ) {
      this._swalService.verify();
      this._partnerService.addPartner(
        String( this.formy.controls.name.value ).trim().toLowerCase() ,
        String( this.formy.controls.lastName.value ).trim().toLowerCase() ,
        String( this.formy.controls.email.value ).trim().toLowerCase() ,
        String( this.formy.controls.password.value ).trim() ,
        String( this.formy.controls.codeCountry.value ).trim() ,
        String( this.formy.controls.phone.value ).trim() ,
        String( this.formy.controls.description.value ).trim() ,
        this._utilService.generarAvatar( String( this.formy.controls.name.value ).trim() , String( this.formy.controls.lastName.value ).trim() )
      ).subscribe(
        ( result: any ) => {
          this._swalService.close();
          this.dialogRef.close( true )
        }, err => {
          if ( err.error.message === 'Token Invalid' ) {
            this._swalService.errorMessage( 'Sesión expirada' );
            this._sessionService.removeSesion();
          } else {
            this._swalService.errorMessage( err.error.message );
          }
        }
      );
    }
  }

  
  numberOnly( event: any ): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ( charCode > 31 && ( charCode < 48 || charCode > 57 ) ) {
      return false;
    }
    return true;
  }
}
