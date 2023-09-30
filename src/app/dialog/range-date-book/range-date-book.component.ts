import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
@Component({
  selector: 'app-range-date-book',
  templateUrl: './range-date-book.component.html',
  styleUrls: ['./range-date-book.component.scss']
})
export class RangeDateBookComponent implements OnInit {
  formy: any;
  constructor(  public dialogRef: MatDialogRef<RangeDateBookComponent> ,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    this.formy = new FormGroup({
      dateIn: new FormControl( dataDialog.FECHAIN !== '' ? new Date( moment( dataDialog.FECHAIN ).format() ) : '' , [ Validators.required ] ) ,
      dateOut: new FormControl( dataDialog.FECHAOUT !== '' ? new Date( moment( dataDialog.FECHAOUT ).format() ) : '' , [ Validators.required ] ) ,
    });
  }

  ngOnInit(): void {
  }

  send( form: FormGroup ) {
    
  }

  returnFalse( event: Event ) {
    return false;
  }

  sendSelect( type: string ) {
    let error = 0;
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
      let diaTemp: any = new Date( this.formy.controls.dateIn.value ).getUTCDate();
      if ( String(diaTemp).length === 1 ) {
        diaTemp = '0' + diaTemp;
      }
      let mesTemp: any = new Date( this.formy.controls.dateIn.value ).getMonth() + 1;
      if ( String(mesTemp).length === 1 ) {
        mesTemp = '0' + mesTemp;
      }
      let anoTemp = new Date( this.formy.controls.dateIn.value ).getFullYear();
      let fechaTemp1 = `${anoTemp}-${mesTemp}-${diaTemp}` ;
  
      diaTemp = new Date( this.formy.controls.dateOut.value ).getUTCDate();
      if ( String(diaTemp).length === 1 ) {
        diaTemp = '0' + diaTemp;
      }
      mesTemp = new Date( this.formy.controls.dateOut.value ).getMonth() + 1;
      if ( String(mesTemp).length === 1 ) {
        mesTemp = '0' + mesTemp;
      }
      anoTemp = new Date( this.formy.controls.dateOut.value ).getFullYear();
      let fechaTemp2 = `${anoTemp}-${mesTemp}-${diaTemp}` ;
      
      this.dialogRef.close( { FECHAIN: fechaTemp1 , FECHAOUT: fechaTemp2 , TYPE: type }  )
    }
  }
}
