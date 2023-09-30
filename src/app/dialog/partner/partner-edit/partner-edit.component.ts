import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from '../../../services/partner.service';
import { UtilService } from '../../../services/util.service';
import { SwalService } from '../../../services/swal.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { AccountAddComponent } from '../../bankAccount/account-add/account-add.component';
import { AccountEditComponent } from '../../bankAccount/account-edit/account-edit.component';
import { SessionService } from 'src/app/services/session.service';
import { PartnerAvatarComponent } from '../partner-avatar/partner-avatar.component';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss']
})
export class PartnerEditComponent implements OnInit {
  formy: any;
  listCodeCountry: any = [
    '+569' ,
    '+562'
  ];
  accounts: any = [];
  partner: any = {};
  constructor(  public dialogRef: MatDialogRef<PartnerEditComponent> ,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any ,
                private _partnerService: PartnerService ,
                private _utilService: UtilService ,
                private _swalService: SwalService ,
                public dialog: MatDialog ,
                private _sessionService : SessionService ) {
    this.formy = new FormGroup({
      name: new FormControl( '' , [ Validators.required , Validators.minLength(3) ] ) ,
      lastName: new FormControl( '' , [ Validators.required ] ) ,
      email: new FormControl( '' , [ Validators.required , Validators.email ] ) ,
      password: new FormControl( '' , [  ] ),
      codeCountry: new FormControl( '' , [ Validators.required ] ) ,
      phone: new FormControl( '' , [ Validators.required ] ) ,
      description: new FormControl( '' , [ Validators.required ] )
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this._swalService.verify();
    this._partnerService.getPartner(
      this.dataDialog.id
    ).subscribe(
      ( result: any ) => {
        this.partner = result.data;
        this.formy.controls.name.setValue( result.data.name );
        this.formy.controls.lastName.setValue( result.data.last_name );
        this.formy.controls.email.setValue( result.data.email );
        this.formy.controls.codeCountry.setValue( this.listCodeCountry.filter( (item: any) => item === result.data.phone_code )[0] );
        this.formy.controls.phone.setValue( result.data.phone );
        this.formy.controls.description.setValue( result.data.description );
        setTimeout(() => {
          this.formy.controls.password.setValue( '' );
        }, 100 );

        this.accounts = result.data.bankAccounts;

        this._swalService.close();
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

    if ( String( this.formy.controls.lastName.value ).trim() === '' || this.formy.controls.lastName.value === null || String( this.formy.controls.lastName.value ).trim().length < 3 ) {
      this.formy.controls.lastName.setErrors( { required: true } );
      if ( String( this.formy.controls.lastName.value ).trim().length < 3 ) {
        this.formy.controls.lastName.setErrors( { minlength: true } );
      }
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

    if ( String( this.formy.controls.password.value ).trim() !== '' ) {
      if ( this.formy.controls.password.value === null || String( this.formy.controls.password.value ).trim().length < 6 ) {
        this.formy.controls.password.setErrors( { required: true } );
        if ( String( this.formy.controls.password.value ).trim().length < 6 ) {
          this.formy.controls.password.setErrors( { minlength: true } );
        }
        error++;
      } else {
        this.formy.controls.password.setErrors();
      }
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
      this._partnerService.editPartner(
        this.dataDialog.id ,
        String( this.formy.controls.name.value ).trim().toLowerCase() ,
        String( this.formy.controls.lastName.value ).trim().toLowerCase() ,
        String( this.formy.controls.email.value ).trim().toLowerCase() ,
        String( this.formy.controls.password.value ).trim() ,
        String( this.formy.controls.codeCountry.value ).trim() ,
        String( this.formy.controls.phone.value ).trim() ,
        String( this.formy.controls.description.value ).trim()
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

  principal( item: any ) {
    this._swalService.verify();
    this._partnerService.principalAccount(
      this.dataDialog.id ,
      item.id
    ).subscribe(
      ( result: any ) => {
        this.accounts = result.data;
        this._swalService.close();
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

  delete( item: any ) {
    Swal.fire({
      title: 'Eliminar Cuenta',
      html: `¿Está seguro que desea realizar esta acción?`,
      allowOutsideClick: false,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      width: 400
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._swalService.verify();
        this._partnerService.deleteAccount(
          this.dataDialog.id ,
          item.id
        ).subscribe(
          ( result: any ) => {
            this.accounts = result.data;
            this._swalService.close();
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
    });
  }

  addAccount() {
    const dialogRef = this.dialog.open( AccountAddComponent ,  {
      width: '450px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false ,
      data: this.dataDialog.id
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          this.getInfo();
        }
      }
    );
  }

  edit( account: any ) {
    const dialogRef = this.dialog.open( AccountEditComponent ,  {
      width: '450px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false ,
      data: { PARTNER: this.dataDialog.id , ACCOUNT: account }
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          this.getInfo();
        }
      }
    );
  }
  
  numberOnly( event: any ): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ( charCode > 31 && ( charCode < 48 || charCode > 57 ) ) {
      return false;
    }
    return true;
  }

  editAvatar() {
    const dialogRef = this.dialog.open( PartnerAvatarComponent ,  {
      width: '900px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false ,
      data: { PARTNER: this.partner }
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          this._swalService.verify();
          this._partnerService.addAvatar(
            this.dataDialog.id ,
            resultDialog
          ).subscribe(
            (result: any) => {
              this.partner.avatar = result.data.avatar;
            }, err => {
              this._swalService.errorMessage( err.error.message );
            }
          )
          this.getInfo();
        }
      }
    );
  }
}
