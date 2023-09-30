import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperienceService } from 'src/app/services/experience.service';
import { SessionService } from 'src/app/services/session.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-not-available-add',
  templateUrl: './not-available-add.component.html',
  styleUrls: ['./not-available-add.component.scss']
})
export class NotAvailableAddComponent implements OnInit {
  formy: any;
  constructor(  public dialogRef: MatDialogRef<NotAvailableAddComponent> ,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any ,
                private _swalService: SwalService ,
                private _sessionService : SessionService ,
                private _experienceService: ExperienceService ) {
    this.formy = new FormGroup({
      title: new FormControl( '' , [ Validators.required ] ) ,
      dateIn: new FormControl( '' , [ Validators.required ] ) ,
      dateOut: new FormControl( '' , [ Validators.required ] ) ,
    });
  }

  ngOnInit(): void {
  }

  send( form: FormGroup ) {
    let error = 0;
    if ( String( this.formy.controls.title.value ).trim() === '' || this.formy.controls.title.value === null ) {
      this.formy.controls.title.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.title.setErrors();
    }

    if ( String( this.formy.controls.dateIn.value ).trim() === '' || this.formy.controls.dateIn.value === null ) {
      this.formy.controls.dateIn.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.dateIn.setErrors();
    }

    if ( String( this.formy.controls.dateOut.value ).trim() === '' || this.formy.controls.dateOut.value === null ) {
      this.formy.controls.dateOut.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.dateOut.setErrors();
    }

    if ( error === 0 ) {
      this._swalService.verify();
      this._experienceService.addDateNotAvailable(
        this.dataDialog ,
        String( this.formy.controls.title.value ).trim() ,
        this.formy.controls.dateIn.value ,
        this.formy.controls.dateOut.value
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

  returnFalse( event: Event ) {
    return false;
  }
}
