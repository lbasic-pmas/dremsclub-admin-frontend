import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-partner-avatar',
  templateUrl: './partner-avatar.component.html',
  styleUrls: ['./partner-avatar.component.scss']
})
export class PartnerAvatarComponent implements OnInit {
  fileData: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imagen = null;
  constructor(  public dialogRef: MatDialogRef<PartnerAvatarComponent> ,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any ,
                private _swalService : SwalService ) {
    this.imagen = dataDialog.PARTNER.avatar;
  }

  ngOnInit(): void {
  }

  fileChangeEvent( event: any ): void {
    this.fileData = event.target.files[0];
    if ( this.fileData.type.match(/image\/*/) === null) {
      this._swalService.errorMessage( 'El archivo no es de tipo imagen' );
      return;
    }
    this.imageChangedEvent = event;
  }
  imageCropped( event: any ) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  confirmar() {
    this.dialogRef.close( this.croppedImage );
  }

}
