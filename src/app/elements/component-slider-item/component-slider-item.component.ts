import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExperienceImageComponent } from 'src/app/dialog/experience-image/experience-image.component';



@Component({
  selector: 'app-component-slider-item',
  templateUrl: './component-slider-item.component.html',
  styleUrls: ['./component-slider-item.component.scss']
})
export class ComponentSliderItemComponent implements OnInit {

  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  formy: any;

  cambiosRealizados: boolean = false; 

  imageDesktop: any = 'assets/images/notImage.png'
  imageMobile: any = 'assets/images/notImage.png'

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
      description: new FormControl( '' , [ Validators.required ]),

    });
  }

  ngOnInit(): void {    
    if(this.data){
      try {
        this.setControlLogoWeb('web', this.data.imageDesktop);
        this.setControlLogoWeb('mobile', this.data.imageMobile);
        this.setControlValue('title', this.data.title);
        this.setControlValue('subTitle', this.data.subTitle);
        this.setControlValue('description', this.data.description);
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
      if(logo === 'web'){
        this.imageDesktop = url;
      }else{
        this.imageMobile = url;
      }
    }
  }

  addImageDescktop() {
    const dialogRef = this.dialog.open( ExperienceImageComponent ,  {
      width: '900px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false,
      data: 1
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          this.imageDesktop = resultDialog.imgDesktop
          this.cambiosRealizados = true;
        }
      }
    );
  }

  addImageMobile() {
    const dialogRef = this.dialog.open( ExperienceImageComponent ,  {
      width: '900px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false,
      data: 2
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          this.imageMobile = resultDialog.imgMobile
          this.cambiosRealizados = true;
        }
      }
    );
  }


  onSubmited(){
    let data = {
      imageDesktop: this.imageDesktop ,
      imageMobile: this.imageMobile ,
      title: this.formy.value.title ,
      subTitle: this.formy.value.subTitle,
      description:  this.formy.value.description,
     }
     this.dataEvent.emit(data);
      this.cambiosRealizados = false;
   }

   deleteSlider(){
    this.dataEvent.emit("delete");
   }

}
