import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';
import { TbkService } from '../../../services/tbk.service';
import { SessionService } from '../../../services/session.service';
import { MercadopagoService } from '../../../services/mercadopago.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-partner-suscription',
  templateUrl: './partner-suscription.component.html',
  styleUrls: ['./partner-suscription.component.scss']
})
export class PartnerSuscriptionComponent implements OnInit {
  @ViewChild('formTBK') formTBK!: ElementRef;
  formaPago: any = 'transbank';
  tbkData: any = {};
  processTbk = false;
  constructor(  @Inject(MAT_DIALOG_DATA) public dataDialog: any ,
                private _swalService : SwalService ,
                private _tbkService: TbkService ,
                private _sessionService: SessionService ,
                private _mercadoPagoService: MercadopagoService ) {

  }

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
    this._mercadoPagoService.start(
      
    ).subscribe(
      (result: any) => {
        window.location.href = result.data.init_point
        
      }, err => {
        this._swalService.errorMessage( err.error.message );
      }
    );
  }

}
