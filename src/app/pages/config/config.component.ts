import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  dataLogo: any =  {
    "logo1": {
        "img": 'assets/images/notImage.png',
        "titulo": "aaa",
        "description": "aaa"
    },
    "logo2": {
        "img": 'assets/images/notImage.png',
        "titulo": "aaaa",
        "description": "aaaaa"
    }
}
  dataSocialMedia: any = [
    {
        "title": "aa",
        "description": "aa",
        "url": "aaaa",
        "icon": 'assets/images/notImage.png'
    }
]

  constructor(  ) { 

  }


  ngOnInit(): void {

  }

  handleDataLogo(data: any) {
    this.dataLogo = data;
    console.log(this.dataLogo);
  }

  handleDataSocialMedia(data: any) {
    this.dataSocialMedia = data;
    console.log(this.dataSocialMedia);

  }
}
