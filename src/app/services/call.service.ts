import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  url = environment.urlApi;
  token: any;
  httpOptions: any;
  constructor(  private http: HttpClient ,
                private router: Router ,
                private _swalService : SwalService ) { }

  getQuery( section: string ):Observable<any> {
    return this.http
            .get( this.url + section , this.getOptions() )
            .pipe( catchError( this.handleError ) );
  }

  postQuery( section: string , data: object ) {
    return this.http
              .post( this.url + section , data , this.getOptions() )
              .pipe( catchError( this.handleError ) );
  }

  putQuery( section: string , data: object ) {
    return this.http
              .put( this.url + section , data , this.getOptions() )
              .pipe( catchError( this.handleError ) );
  }

  deleteQuery( section: string ) {
    return this.http
              .delete( this.url + section , this.getOptions() )
              .pipe( catchError( this.handleError ) );
  }

  itemQuery( file: any ) {
    const formData = new FormData();
    formData.append('file', file );
    return this.http
              .post<any>( this.url + 'assets/UploadFile' , formData , this.getOptionsFile() )
              .pipe( catchError( this.handleError ) );
  }

  getOptions() {
    this.token = localStorage.getItem( btoa('token') );
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          Authorization : `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      ) };
    return this.httpOptions;
  }

  getOptionsFile() {
    this.token = localStorage.getItem( btoa('token') );
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          Authorization : `Bearer ${this.token}`,
          'enctype' : 'multipart/form-data'
        }
      ) };
    return this.httpOptions;
  }

  getMux( idMux: any ) {
    return this.http
              .get( 'https://api.mux.com/video/v1/video/v1/assets/'+ idMux +'/playback-ids' , this.getOptions() )
              .pipe( catchError( this.handleError ) );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
