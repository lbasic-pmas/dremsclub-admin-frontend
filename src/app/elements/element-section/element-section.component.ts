import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExperienceImageComponent } from 'src/app/dialog/experience-image/experience-image.component';

@Component({
  selector: 'app-element-section',
  templateUrl: './element-section.component.html',
  styleUrls: ['./element-section.component.scss']
})
export class ElementSectionComponent implements OnInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  formy: any;
  cambiosRealizados: boolean = false; 

  images: any = []

  modulesQuill = {
    toolbar: [    
      ['bold', 'italic', 'underline', 'strike'],        
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      [{ 'color': [] }],                                     
    ]
  };


  constructor(public dialog: MatDialog) { 
    this.formy = new FormGroup({
      title: new FormControl( '' , [ Validators.required ]),
      subTitle: new FormControl( '' , [ Validators.required ]),

      buttonTitle: new FormControl( '' , [ Validators.required ]),
      buttonSubTitle: new FormControl( '' , [ Validators.required ]),

      active: new FormControl( '' , [ Validators.required ]),
      activeMenu: new FormControl( '' , [ Validators.required ]),
      activeMenuButton: new FormControl( '' , [ Validators.required ]),

      
      
      
    });
  }

  ngOnInit(): void {
    if(this.data){

      try {
        this.setControlImages(this.data.images);
        this.setControlValue('title', this.data.title);
        this.setControlValue('subTitle', this.data.subTitle);

        this.setControlValue('buttonTitle', this.data.buttonTitle);
        this.setControlValue('buttonSubTitle', this.data.buttonSubTitle);

        this.setControlValue('active', this.data.active);
        this.setControlValue('activeMenu', this.data.activeMenu);
        this.setControlValue('activeMenuButton', this.data.activeMenuButton);

  
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

  setControlImages(value:any ){
    if (value !== undefined && value !== null && value.length > 0) {
      this.images = value;
    } 
  }

  onSubmited(){
   let data = {
    title: this.formy.value.title ,
    subTitle: this.formy.value.subTitle , 
    images: this.images ,
    buttonTitle: this.formy.value.buttonTitle,
    buttonSubTitle: this.formy.value.buttonSubTitle,
    active: this.formy.value.active,
    activeMenu: this.formy.value.activeMenu,
    activeMenuButton: this.formy.value.activeMenuButton,
  }
    this.dataEvent.emit(data);
    this.cambiosRealizados = false;
  }

  deleteElement(){
    this.dataEvent.emit("delete");
  }


  addImage() {
    const dialogRef = this.dialog.open( ExperienceImageComponent ,  {
      width: '900px',
      disableClose: true,
      maxHeight: '96vh',
      maxWidth: '95vw' ,
      autoFocus: false,
      data: 3
    });

    dialogRef.afterClosed().subscribe(
      ( resultDialog: any ) => {
        if ( resultDialog ) {
          console.log(resultDialog);
          this.images.push(resultDialog)
          this.cambiosRealizados = true;
        }
      }
    );
  }

  deleteImage(index:any){
    //eliminar imagen
    this.images.splice(index, 1);
    this.cambiosRealizados = true;
  }

}
