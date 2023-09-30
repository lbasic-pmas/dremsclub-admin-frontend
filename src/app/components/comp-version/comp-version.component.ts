import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')

@Component({
  selector: 'app-comp-version',
  templateUrl: './comp-version.component.html',
  styleUrls: ['./comp-version.component.scss']
})
export class CompVersionComponent implements OnInit {

  lastCommitLabel = environment.lastCommitLabel;
  lastCommitUrl = environment.lastCommitUrl;
  deploy = environment.deploy;
  textoDeploy: any = '';
  active = false;
  constructor(  private elem: ElementRef ) { }

  ngOnInit(): void {
  }


  activar() {
    if ( this.active ) {
      this.active = false;
    } else {
      this.textoDeploy = timeAgo.format( new Date( this.deploy ) );
      this.active = true;
    }
  }

  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (this.elem.nativeElement.contains(event.target)) {

    } else {
      this.active = false;
    }
  }
}