import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SwalService } from 'src/app/services/swal.service';
import { TbkService } from 'src/app/services/tbk.service';

@Component({
  selector: 'app-partner-renew',
  templateUrl: './partner-renew.component.html',
  styleUrls: ['./partner-renew.component.scss']
})
export class PartnerRenewComponent implements OnInit {
  @ViewChild('formTBK') formTBK!: ElementRef;
  formaPago: any = 'transbank';
  tbkData: any = {};
  processTbk = false;
  constructor(  private _swalService : SwalService ,
                private _tbkService: TbkService ,
                private _sessionService: SessionService ) { }

  ngOnInit(): void {
  }

  seleccionarPago( forma: string ) {
    this.formaPago = forma;
  }

  pagar() {
    if ( this.formaPago === 'transbank' ) {
      this.pagoTransbank();
    }
    if ( this.formaPago === 'mercadoPago' ) {
      this.pagoMercadoPago();
    }
  }

  pagoTransbank() {
    this._swalService.verify();
    this._tbkService.start().subscribe(
      (result: any) => {
        this.tbkData.token = result.data.startResponse.token;
        this.tbkData.url = result.data.startResponse.url_webpay;
        this.processTbk = true;
        setTimeout(() => {
          this.formTBK.nativeElement.submit();
        }, 100);
      }, err => {
        this._swalService.errorMessage( err.error.message );
      }
    );
  }

  pagoMercadoPago() {
    this._swalService.verify();
    // this._mercadoPagoService.begin(
    //   this.experienceId ,
    //   this.convertFecha( moment( this.info.FECHAIN ).format() ) ,
    //   this.convertFecha( moment( this.info.FECHAOUT ).format() ) ,
    //   this.info.GRUPO[0].CANTIDAD ,
    //   this.info.GRUPO[1].CANTIDAD ,
    // ).subscribe(
    //   (result: any) => {
    //     window.location.href = result.data.mercadopago.url;
    //   }, err => {
    //     this._swalService.errorMessage( err.error.message );
    //   }
    // );
  }

}
