import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExperienceImageComponent } from 'src/app/dialog/experience-image/experience-image.component';


@Component({
  selector: 'app-component-cards',
  templateUrl: './component-cards.component.html',
  styleUrls: ['./component-cards.component.scss']
})
export class ComponentCardsComponent implements OnInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  formy: any;

  cambiosRealizados: boolean = false; 

  imageBackground: any = 'assets/images/notImage.png'
  icon: any = 'assets/images/notImage.png'

  cols: any = [ 1, 2, 3, 4]

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
      buttonTitle: new FormControl( '' , [ Validators.required ]),
      urlButton: new FormControl( '' , [ Validators.required ]),
      col: new FormControl( '' , [ Validators.required ]),
      btnActive: new FormControl( '' , [ Validators.required ]),
    });
  }
  ngOnInit(): void {    
    if(this.data){
      try {
        this.setControlLogoWeb('background', this.data.imageBackground);
        this.setControlLogoWeb('icon', this.data.icon);
        this.setControlValue('title', this.data.title);
        this.setControlValue('subTitle', this.data.subTitle);
        this.setControlValue('buttonTitle', this.data.buttonTitle);
        this.setControlValue('urlButton', this.data.urlButton);
        this.setControlValue('col', this.data.col);
        this.setControlValue('btnActive', this.data.btnActive);
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
      }else{
        this.icon = url;
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

  addIcon() {
    const dialogRef = this.dialog.open( ExperienceImageComponent ,  {
      width: '900px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false,
      data: 5
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          this.icon = resultDialog.icon
          this.cambiosRealizados = true;
        }
      }
    );
  }


  onSubmited(){
    let data = {
      imageBackground: this.imageBackground ,
      icon: this.icon ,
      title: this.formy.value.title ,
      subTitle: this.formy.value.subTitle,
      buttonTitle: this.formy.value.buttonTitle,
      urlButton: this.formy.value.urlButton,
      col: this.formy.value.col,
      btnActive: this.formy.value.btnActive,
      }
      this.dataEvent.emit(data);
      this.cambiosRealizados = false;
   }


  deleteCard(){
    this.dataEvent.emit("delete");
   }


}
