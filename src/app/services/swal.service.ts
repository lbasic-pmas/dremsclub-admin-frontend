import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  verify() {
    Swal.fire({
      title: 'Verificando Información',
      html: 'Por favor espere',
      allowOutsideClick: false,
      allowEscapeKey: false,
      width: 300
    });
    Swal.showLoading();
  }

  exito() {
    let timerInterval: any;
    let time = 3;
    Swal.fire( {
      title: 'Acción realizada',
      icon: 'success',
      timerProgressBar: true,
      timer: time * 1000,
      didOpen: () => {
        timerInterval = setInterval(() => {
          if ( time > 1 ) {
            time--;
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    });
  }

  alertSuccess( mensaje: string ) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast : any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: mensaje
    })
  }

  error() {
    let timerInterval: any;
    let time = 3;
    Swal.fire({
      title: 'Acción no realizada',
      html: 'Por favor intente de nuevo, si el error persiste, comuniquese con el Administrador',
      icon: 'error',
      timerProgressBar: true,
      timer: time * 1000,
      didOpen: () => {
        timerInterval = setInterval(() => {
          if ( time > 1 ) {
            time--;
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    });
  }

  errorMessage( mensaje: any ) {
    mensaje = Array.isArray(mensaje) ? mensaje[0].msg + ': ' + mensaje[0].param  : mensaje;
    let timerInterval: any;
    let time = 3;

    Swal.fire({
      title: 'Acción no realizada',
      html: mensaje ,
      timerProgressBar: true ,
      width: 350 ,
      timer: time * 1000,
      didOpen: () => {
        timerInterval = setInterval(() => {
          if ( time > 1 ) {
            time--;
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    });
  }

  errorTipo( tipo: number ) {
    let mensaje;
    switch ( tipo ) {
      case 1:
        mensaje = 'No se pudo establercer conexión con el sistema. Si el error persiste, intente iniciar sesión nuevamente.';
        break;
      case 2:
        mensaje = 'Su sesión ha expirado o los datos de la sesión se han dañado. Vuelva a Iniciar Sesión.';
        break;
      default:
        mensaje = '';
        break;
    }
    Swal.fire({
      title: 'Error de Conexión',
      html: mensaje,
      icon: 'error',
    });
  }

  close() {
    Swal.close();
  }
}
