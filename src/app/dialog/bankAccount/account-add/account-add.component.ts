import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartnerService } from 'src/app/services/partner.service';
import { SessionService } from 'src/app/services/session.service';
import { SwalService } from 'src/app/services/swal.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {
  formy: any;
  listBanks: any = [];
  types: any = [];

  constructor(  public dialogRef: MatDialogRef<AccountAddComponent> ,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any ,
                private _partnerService: PartnerService ,
                private _utilService: UtilService ,
                private _swalService: SwalService ,
                private _sessionService : SessionService ) {
    this.formy = new FormGroup({
      bank: new FormControl( '' , [ Validators.required ] ) ,
      type: new FormControl( '' , [ Validators.required ] ) ,
      number: new FormControl( '' , [ Validators.required ] ),
      name: new FormControl( '' , [ Validators.required ] ) ,
      rut: new FormControl( '' , [ Validators.required ] ),
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this._swalService.verify();
    this._partnerService.getBaseAccount().subscribe(
      (result: any) => {
        this.listBanks = result.data.bank;
        this.types = result.data.typeAccount;

        this._swalService.close();
      }, err => {
        if ( err.error.message === 'Token Invalid' ) {
          this._swalService.errorMessage( 'Sesión expirada' );
          this._sessionService.removeSesion();
        } else {
          this._swalService.errorMessage( err.error.message );
          this.dialogRef.close();
        }
      }
    );
  }

  send( form: FormGroup ) {
    let error = 0;
    if ( String( this.formy.controls.bank.value ).trim() === '' || this.formy.controls.bank.value === null ) {
      this.formy.controls.bank.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.bank.setErrors();
    }

    if ( String( this.formy.controls.type.value ).trim() === '' || this.formy.controls.type.value === null ) {
      this.formy.controls.type.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.type.setErrors();
    }

    if ( String( this.formy.controls.number.value ).trim() === '' || this.formy.controls.number.value === null ) {
      this.formy.controls.number.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.number.setErrors();
    }

    if ( String( this.formy.controls.name.value ).trim() === '' || this.formy.controls.name.value === null ) {
      this.formy.controls.name.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.name.setErrors();
    }

    if ( String( this.formy.controls.rut.value ).trim() === '' || this.formy.controls.rut.value === null ) {
      this.formy.controls.rut.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.rut.setErrors();
    }

    if ( error === 0 ) {
      this._swalService.verify();
      this._partnerService.addAccount(
        this.dataDialog ,
        this.formy.controls.bank.value.id ,
        this.formy.controls.type.value.id ,
        String( this.formy.controls.number.value ).trim() ,
        String( this.formy.controls.name.value ).trim() ,
        this._utilService.formateoRut( String( this.formy.controls.rut.value ).trim() )
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

  validoRut( input: HTMLInputElement ) {
    if ( !this._utilService.validoRut( input.value ) ) {
      this.formy.controls.rut.setErrors( { novalid: true } );
    } else {
      this.formy.controls.rut.setErrors();
    }
  }

  formateoRut( input: HTMLInputElement ) {
    input.value = this._utilService.formateoRut( input.value );
  }
}
