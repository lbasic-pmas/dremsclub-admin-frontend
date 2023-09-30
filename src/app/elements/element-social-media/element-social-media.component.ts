import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-element-social-media',
  templateUrl: './element-social-media.component.html',
  styleUrls: ['./element-social-media.component.scss']
})
export class ElementSocialMediaComponent implements OnInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  socialMedia: any = []

  constructor() { 

  }

  ngOnInit(): void {
    if(this.data.length > 0){
      this.socialMedia = this.data;
   }else{
    this.addSocialMedia();
   }
  }

  //manejo de datos 
  addSocialMedia(){
    let data = {
      title: '',
      description: '',
      url: '',
      icon: 'assets/images/notImage.png',
    }
    this.socialMedia.push(data)
    this.onSubmited();
  }

  handleSocialMedia(data: any, index: any) {
    if(data === "delete"){
      this.socialMedia.splice(index, 1);
      this.onSubmited();
      return;
    }
    this.socialMedia[index] = data;
    this.onSubmited();
  }


  //envio de datos a dreams-pages-add
  onSubmited(){
    let data = this.socialMedia
    this.dataEvent.emit(data);
  }
}
