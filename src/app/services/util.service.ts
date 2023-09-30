import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { PartnerRenewComponent } from '../dialog/partner/partner-renew/partner-renew.component';
import { PartnerSuscriptionComponent } from '../dialog/partner/partner-suscription/partner-suscription.component';



@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  canvasImage: any;
  canvasColors: any;
  canvasOpcion: any;

  isProduction = environment.production;

  constructor(  public dialog: MatDialog ) {

  }

  generarAvatar( nombre: string , apellido: string ) {
    this.canvasColors = [
      { bg : '#bc9a36', text: '#131526' }
    ];
    this.canvasOpcion = Math.floor( Math.random() * 1);
    this.canvasImage = document.createElement('canvas');
    this.canvasImage.width = 400;
    this.canvasImage.height = 400;
    const ctx = this.canvasImage.getContext('2d');
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.canvasColors[ this.canvasOpcion ].bg;
    ctx.fillRect(0, 0, this.canvasImage.width, this.canvasImage.height);
    ctx.save();
    ctx.font = '200px Arial';
    ctx.lineHeight = '200px';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.canvasColors[ this.canvasOpcion ].text;
    ctx.fillText( ( nombre.charAt(0) + apellido.charAt(0) ).toUpperCase() , this.canvasImage.width / 2, 270);

    return this.canvasImage.toDataURL();
  }

  getExpresion( target: string ) {
    let expresion;
    switch ( target ) {
      case 'correo':
        expresion = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        break;
      case 'password':
        expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,64}$/;
        break;
      case 'mayuscula':
        expresion = /^(.*[A-Z])/;
        break;
      case 'minuscula':
        expresion = /^(.*[a-z])/;
        break;
      case 'numero':
        expresion = /^(.*[0-9])/;
        break;
      case 'simbolo':
        expresion = /^(.*[_@$!%*?&])/;
        break;
      case 'onlyNumber':
        expresion = /^[0-9]*$/;
        break;
    }
    return expresion;
  }

  formateoRut( identificador: string ) {
    const id = String( identificador );
    const cuerpo = id.substr(0, id.length - 1);
    const verificador = id.substr(-1);
    let enviado: string;
    enviado = cuerpo.replace('-', '').replace( /\./g , '' ) + '-' + verificador;
    return enviado.toUpperCase();
  }

  validoRut( rut: string ) {
    // Despejar Puntos
    let valor: any = rut.replace( /\./g , '' );
    // Despejar Guión
    valor = valor.replace( '-' , '' );

    // Aislar Cuerpo y Dígito Verificador
    const cuerpo = valor.slice( 0 , -1 );
    let dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut = cuerpo + '-' + dv;

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    // if ( cuerpo.length < 7 ) {
    //   // rut.setCustomValidity('RUT Incompleto');
    //   return false;
    // }
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;
    // Para cada dígito del Cuerpo
    for ( let i = 1 ; i <= cuerpo.length ; i++ ) {
      // Obtener su Producto con el Múltiplo Correspondiente
      const index = multiplo * valor.charAt( cuerpo.length - i );
      // Sumar al Contador General
      suma = suma + index;
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }
    // Calcular Dígito Verificador en base al Módulo 11
    const dvEsperado = 11 - (suma % 11);
    // Casos Especiales (0 y K)
    dv = ( String(dv) === 'K' ) ? 10 : dv;
    dv = ( String(dv) === '0' ) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if ( String(dvEsperado) !== String(dv) ) {
      // rut.setCustomValidity('RUT Inválido');
      return false;
    }
    return true;
  }

  getRute(type: string) {
    let filter = '';
    switch (type) {
      case 'experience':
        filter = 'images/experiencies/';
        break;
      case 'slider':
        filter = 'images/sliders/';
        break;
      case 'categories':
        filter = 'images/categories/';
        break;
      case 'services':
        filter = 'images/services/';
        break;
    }
    return (
      (this.isProduction
        ? 'https://prod-trypo-assets.s3.sa-east-1.amazonaws.com/'
        : 'https://staging-trypo-assets.s3.amazonaws.com/') + filter
    );
  }


  requestSubscription( status: boolean ) {
    const dialogRef = this.dialog.open( PartnerSuscriptionComponent ,  {
      width: '550px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false,
      data: status
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          
        }
      }
    );
  }

  // requestPayment() {
  //   const dialogRef = this.dialog.open( PartnerRenewComponent ,  {
  //     width: '550px',
  //     disableClose: true,
  //     maxHeight: '96vh',
  //     maxWidth: '95vw' ,
  //     autoFocus: false
  //   });

  //   dialogRef.afterClosed().subscribe(
  //     ( resultDialog: any ) => {
  //       if ( resultDialog ) {
          
  //       }
  //     }
  //   );
  // }
}
