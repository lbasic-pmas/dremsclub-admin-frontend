import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { PartnerService } from 'src/app/services/partner.service';
import { SessionService } from 'src/app/services/session.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-dreams-pages',
  templateUrl: './dreams-pages.component.html',
  styleUrls: ['./dreams-pages.component.scss']
})
export class DreamsPagesComponent implements OnInit {
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

  partners: any = [];
  partnersFilter: any = [];

  categories: any = [];
  categoriesFilter: any = [];

  isFirst = true;  
  @ViewChild(DreamsPagesComponent, { static: true }) table: DreamsPagesComponent =
    Object.create(null);

  formy: any;

  filterCharge = false;

  page: any =  {
    size : 50 ,
    totalElements : 0 ,
    totalPages : 0 ,
    pageNumber : 0
  };

  user:any = {};


  constructor(  private _partnerService: PartnerService ,
                private _swalService : SwalService ,
                private _experienceService: ExperienceService ,
                private _categoryService: CategoryService ,
                private router: Router ,
                private _sessionService : SessionService ) {
    this.formy = new FormGroup({
      partner: new FormControl( '0' , [  ] ),
      category: new FormControl( '0' , [  ] ),
      word: new FormControl( '' , [  ] ),
    });
  }

  ngOnInit(): void {
    localStorage.removeItem( btoa( 'idPartner' ) );
    localStorage.removeItem( btoa( 'idExperience' ) );
    this.getInfoBase();
    this.getExperience();
    this.user = this._sessionService.getUser();
  }

  getInfoBase() {
    this._experienceService.getBasePartnerCategory().subscribe(
      (result: any) => {
        this.categories = result.data.categories;
        this.categoriesFilter = result.data.categories;
        this.partners = result.data.partners;
        this.partnersFilter = result.data.partners;

        this.filterCharge = true;
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

  getExperience() {
    this.data = this.data
    this.rows = this.data
    this.temp = [...this.data];

    this.page.totalElements = 3 ;
    this.page.totalPages = 1 ;
    // let filter = '';
    // if ( Number( this.formy.controls.partner.value.id ) !== 0 && this.formy.controls.partner.value.id !== undefined ) {
    //   filter += '&partner=' + this.formy.controls.partner.value.id;
    // }
    // if ( Number( this.formy.controls.category.value.id ) !== 0 && this.formy.controls.category.value.id !== undefined ) {
    //   filter += '&category=' + this.formy.controls.category.value.id;
    // }
    // if ( String( this.formy.controls.word.value ).trim() !== '' ) {
    //   filter += '&filter=' + String( this.formy.controls.word.value ).trim();
    // }
    // this._swalService.verify();
    // this._experienceService.getAll( this.page.size , (this.page.pageNumber + 1) , filter ).subscribe(
    //   (result: any) => {
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


  add() {
    if ( this.formy.controls.partner.value !== '0' ) {
      localStorage.setItem( btoa( 'idPartner' ) , btoa( this.formy.controls.partner.value.id ) );
    } else {
      localStorage.removeItem( btoa( 'idPartner' ) );
    }
    this.router.navigate(['/pages/dreamsPages-add']);
  }

  edit( item: any ) {
    localStorage.setItem( btoa( 'idExperience' ) , btoa( item.id ) );
    this.router.navigate(['/pages/experience-add']);
  }


  changeSearch( event: any ) {
    this.page.pageNumber = 0;
    this.getExperience();
  }

  changeStatus( elemento: any , item: any ) {
    this._swalService.verify();
    this._experienceService.changeStatus( item.id ).subscribe(
      (result: any) => {
        this._swalService.close();
      } , err => {
        if ( err.error.message === 'Token Invalid' ) {
          this._swalService.errorMessage( 'Sesión expirada' );
          this._sessionService.removeSesion();
        } else {
          this._swalService.errorMessage( err.error.message );
          elemento.checked = !elemento.checked;
        }
      }
    );
  }

  send() {
    return
  }

  search( event: any ) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ( charCode === 13 ) {
      this.changeSearch( event );
    }
  }


  setPage( pageInfo : any) {
    this.page.pageNumber = pageInfo.offset;
    this.getExperience();
  }

}
