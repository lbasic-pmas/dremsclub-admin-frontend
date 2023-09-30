import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';
import { SessionService } from 'src/app/services/session.service';
import { SwalService } from 'src/app/services/swal.service';
import { ChangeStateTrypoComponent } from '../../dialog/change-state-trypo/change-state-trypo.component';
import { RangeDateBookComponent } from '../../dialog/range-date-book/range-date-book.component';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rows: any[] = [];
  temp: any = [];
  data: any[] = [
    { status: true,
      id: 1,
      name: 'Home1',
      url: 'https://www.google.com',
      data: {}
    },
    { status: true,
      id: 1,
      name: 'Home2',
      url: 'https://www.google.com',
      data: {}
    },
    { status: true,
      id: 1,
      name: 'Home3',
      url: 'https://www.google.com',
      data: {}
    }
  ];
  page: any =  {
    size : 50 ,
    totalElements : 0 ,
    totalPages : 0 ,
    pageNumber : 0
  };

  chargeStatus = false;
  dataDash: any = {};

  filter: any = '';
  dateIn: any = '';
  dateOut: any = '';
  constructor(  private _swalService : SwalService ,
                private router: Router ,
                private _sessionService : SessionService ,
                private _experienceService: ExperienceService ,
                private _utilService: UtilService ,
                public dialog: MatDialog ) {
  }

  ngOnInit(): void {
    this.getStatus();
    this.getInfo();

    // this._utilService.requestSubscription()
  }

  getStatus() {
    this._experienceService.getTotals().subscribe(
      (result: any) => {
        this.dataDash = result.data;
        this.chargeStatus = true;
      }, err => {

      }
    );
  }

  getInfo() {
    this.data = this.data
    this.rows = this.data
    this.temp = [...this.data];

    this.page.totalElements = 3 ;
    this.page.totalPages = 1 ;
    // this._swalService.verify();
    // this._experienceService.getRegisters( this.page.size , (this.page.pageNumber + 1) , this.filter ).subscribe(
    //   (result: any) => {
    //     this.rows = result.data;
    //     this.data = result.data;
    //     this.temp = [...result.data];

    //     this.page.totalElements = result.total ;
    //     this.page.totalPages = result.totalPages ;

    //     this._swalService.close();
    //   } , err => {
    //     if ( err.error.message === 'Token Invalid' ) {
    //       this._swalService.errorMessage( 'Sesión expirada' );
    //       this._sessionService.removeSesion();
    //     } else {
    //       this._swalService.errorMessage( err.error.message );
    //     }
    //   }
    // );
  }

  setPage( pageInfo : any) {
    this.page.pageNumber = pageInfo.offset;
    this.getInfo();
  }

  edit( item: any ) {
    const dialogRef = this.dialog.open( ChangeStateTrypoComponent ,  {
      width: '350px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false ,
      data: item
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          this.getInfo();
        }
      }
    );
  }

  clearFilter() {
    this.dateIn = '';
    this.dateOut = '';
    this.filter = '';
    this.getInfo();
  }

  applyfilter() {
    const dialogRef = this.dialog.open( RangeDateBookComponent ,  {
      width: '450px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false ,
      data: { FECHAIN: this.dateIn , FECHAOUT: this.dateOut }
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          this.dateIn = resultDialog.FECHAIN;
          this.dateOut = resultDialog.FECHAOUT;
          this.filter = `&date_begin=${resultDialog.FECHAIN}&date_end=${resultDialog.FECHAOUT}`;
          this.getInfo();
          if ( resultDialog.TYPE === 'FiltrarDescargar' ) {
            this.getArchive( resultDialog.FECHAIN , resultDialog.FECHAOUT );
          }
        }
      }
    );
  }

  getArchive( dateIn: string , dateOut: string ) {
    this._experienceService.getExcel( dateIn , dateOut ).subscribe(
      (result: any) => {
        window.open( result.data.excel );
      } , err => {
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
