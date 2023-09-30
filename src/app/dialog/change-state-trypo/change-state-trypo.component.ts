import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperienceService } from 'src/app/services/experience.service';
import { SessionService } from 'src/app/services/session.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-change-state-trypo',
  templateUrl: './change-state-trypo.component.html',
  styleUrls: ['./change-state-trypo.component.scss']
})
export class ChangeStateTrypoComponent implements OnInit {
  formy: any;
  states: any = [];
  fechaTemp: any = '';
  constructor(  public dialogRef: MatDialogRef<ChangeStateTrypoComponent> ,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any ,
                private _swalService: SwalService ,
                private _experienceService: ExperienceService ,
                private _sessionService : SessionService  ) {
    this.formy = new FormGroup({
      state: new FormControl( '' , [ Validators.required ] ) ,
      reason: new FormControl( '' , [  ] ) ,
      code: new FormControl( '' , [  ] ) ,
      date: new FormControl( '' , [  ] ) ,
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }
  
  getInfo() {
    this._swalService.verify();
    this._experienceService.getStatesTrypo().subscribe(
      (result: any) => {
        this.states = result.data;
        this.formy.controls.state.setValue( this.states.filter( (item: any) => item.id === this.dataDialog.id_status_trypo )[0] );
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
    if ( String( this.formy.controls.state.value ).trim() === '' || this.formy.controls.state.value === null ) {
      this.formy.controls.state.setErrors( { required: true } );
      error++;
    } else {
      this.formy.controls.state.setErrors();
    }

    if ( this.formy.controls.state.value.id === 3 ) {
      if ( String( this.formy.controls.reason.value ).trim() === '' || this.formy.controls.reason.value === null ) {
        this.formy.controls.reason.setErrors( { required: true } );
        error++;
      } else {
        this.formy.controls.reason.setErrors();
      }
    }

    if ( this.dataDialog.type === 'TRANSFERENCIA BANCARIA' && this.formy.controls.state.value === 2) {
      if ( String( this.formy.controls.code.value ).trim() === '' || this.formy.controls.code.value === null ) {
        this.formy.controls.code.setErrors( { required: true } );
        error++;
      } else {
        this.formy.controls.code.setErrors();
      }

      if ( String( this.formy.controls.date.value ).trim() === '' || this.formy.controls.date.value === null ) {
        this.formy.controls.date.setErrors( { required: true } );
        error++;
      } else {
        this.formy.controls.date.setErrors();
      }
    }

    if ( error === 0 ) {
      if ( this.dataDialog.type === 'TRANSFERENCIA BANCARIA' ) {
        let diaTemp: any = new Date( this.formy.controls.date.value ).getDate();
        if ( String(diaTemp).length === 1 ) {
          diaTemp = '0' + diaTemp;
        }
        let mesTemp: any = new Date( this.formy.controls.date.value ).getMonth() + 1;
        if ( String(mesTemp).length === 1 ) {
          mesTemp = '0' + mesTemp;
        }
        let anoTemp = new Date( this.formy.controls.date.value ).getFullYear();
        this.fechaTemp = anoTemp + '-' + mesTemp + '-' + diaTemp;
      }
      this._swalService.verify();
      this._experienceService.changeStateTrypo(
        this.dataDialog.id ,
        this.formy.controls.state.value.id ,
        String( this.formy.controls.reason.value ).trim() ,
        String( this.formy.controls.code.value ).trim() ,
        this.fechaTemp
      ).subscribe(
        ( result: any ) => {
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
}
