import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-experience-image',
  templateUrl: './experience-image.component.html',
  styleUrls: ['./experience-image.component.scss']
})
export class ExperienceImageComponent implements OnInit {
  fileData: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImageMobile: any = ''
  croppedImageSection: any = ''
  croppedImageBackground: any = ''
  croppedImageIcon: any = ''
  imagen = 'assets/images/notImage.png';

  state :any 

  constructor(  
                @Inject(MAT_DIALOG_DATA) public dataDialog: any ,
                public dialogRef: MatDialogRef<ExperienceImageComponent> ,
                private _swalService : SwalService ) { }

  ngOnInit(): void {
    this.state = this.dataDialog
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

  imageCroppedMobile( event: any ) {
    this.croppedImageMobile = event.base64;
  }

  imageCroppedSection( event: any ) {
    this.croppedImageSection = event.base64;
  }

  imageCroppedBackground( event: any ) {
    this.croppedImageBackground = event.base64;
  }

  imageCroppedIcon( event: any ) {
    this.croppedImageIcon = event.base64;
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
    if(this.state === 1){
      this.dialogRef.close( {imgDesktop:this.croppedImage} );
    }

    if(this.state === 2){
      this.dialogRef.close( {imgMobile: this.croppedImageMobile} );
    }


    if(this.state === 3){
      this.dialogRef.close( {imgSection: this.croppedImageSection} );
    }

    if(this.state === 4){
      this.dialogRef.close( {imgbackgound: this.croppedImageBackground} );
    }

    if(this.state === 5){
      this.dialogRef.close( {icon: this.croppedImageIcon} );
    }
  }

}
