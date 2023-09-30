import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExperienceImageComponent } from 'src/app/dialog/experience-image/experience-image.component';



@Component({
  selector: 'app-element-featured',
  templateUrl: './element-featured.component.html',
  styleUrls: ['./element-featured.component.scss']
})
export class ElementFeaturedComponent implements OnInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  formy: any
  imageBackground: any = ''
  elementos:any = []
  cambiosRealizados = false;


  modulesQuill = {
    toolbar: [    
      ['bold', 'italic', 'underline', 'strike'],        
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      [{ 'color': [] }],                                     
    ]
  };



  constructor( public dialog: MatDialog ) { 
    this.formy = new FormGroup({
      title: new FormControl( '' , [ Validators.required ]),
      subTitle: new FormControl( '' , [ Validators.required ]),
    });
  }

  ngOnInit(): void {
    if(this.data){
      try {
        this.setControlLogoWeb('background', this.data.imageBackground);
        this.setControlValue('title', this.data.title);
        this.setControlValue('subTitle', this.data.subTitle);
        this.elementos = this.data.featuredItems
      } catch (error) {
        console.log(error)
      }

      this.formy.valueChanges.subscribe(() => {
        this.cambiosRealizados = true;
      });

    }
  }
  setControlValue(controlName: string, value: any) {
    if (value !== undefined && value !== null) {
      this.formy.controls[controlName].setValue(value);
    }
  }

  setControlLogoWeb( logo:any, url:any){
    if(url !== undefined && url !== null){
      if(logo === 'background'){
        this.imageBackground = url;
      }
    }
  }

  addImagebackground() {
    const dialogRef = this.dialog.open( ExperienceImageComponent ,  {
      width: '900px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false,
      data: 4
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          this.imageBackground = resultDialog.imgbackgound
          this.cambiosRealizados = true;
        }
      }
    );
  }

  onSubmited(){
    let data = {
      imageBackground: this.imageBackground ,
      title: '' ,
      subTitle: '',
      active: true,
      featuredItems: this.elementos,
    }
    this.dataEvent.emit(data);
  }

  deleteElement(){
    this.dataEvent.emit("delete");
  }

  addElement(){
    let data = {
      icon: 'assets/images/notImage.png' ,
      title: '' ,
      subTitle1: '',
      subTitle2: '',
    }
    this.elementos.push(data)
    this.onSubmited()
  }

  handleDataCards(data: any, index: any) {
    if(data === "delete"){
      this.elementos.splice(index, 1);  
      this.onSubmited()
    }else {
      this.elementos[index] = data;
      this.onSubmited()
    }
  }

}
