import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExperienceImageComponent } from 'src/app/dialog/experience-image/experience-image.component';


@Component({
  selector: 'app-component-featured',
  templateUrl: './component-featured.component.html',
  styleUrls: ['./component-featured.component.scss']
})
export class ComponentFeaturedComponent implements OnInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  formy: any;
  icon: any = 'assets/images/notImage.png'

  cambiosRealizados: boolean = false; 


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
      subTitle1: new FormControl( '' , [ Validators.required ]),
      subTitle2: new FormControl( '' , [ Validators.required ]),
    });
  }

  ngOnInit(): void {
    if(this.data){
      try {
        this.setControlLogoWeb('icon', this.data.icon);
        this.setControlValue('title', this.data.title);
        this.setControlValue('subTitle1', this.data.subTitle1);
        this.setControlValue('subTitle2', this.data.subTitle2);
      } catch (error) {
        console.log(error)
      }
    }


    this.formy.get('title').valueChanges.subscribe((nuevoValor:any) => {
      console.log('Cambio detectado en el elemento <quill-editor>:', nuevoValor);
      this.cambiosRealizados = true;
    });

    this.formy.get('subTitle1').valueChanges.subscribe((nuevoValor:any) => {
      console.log('Cambio detectado en el elemento <quill-editor>:', nuevoValor);
      this.cambiosRealizados = true;
    });

    this.formy.get('subTitle2').valueChanges.subscribe((nuevoValor:any) => {
      console.log('Cambio detectado en el elemento <quill-editor>:', nuevoValor);
      this.cambiosRealizados = true;
    });

    setTimeout(() => {
      this.cambiosRealizados = false
    }, 300);


  }

  setControlLogoWeb( logo:any, url:any){
    if(url !== undefined && url !== null){
      if(logo === 'icon'){
        this.icon = url;
      }
    }
  }

  setControlValue(controlName: string, value: any) {
    if (value !== undefined && value !== null) {
      this.formy.controls[controlName].setValue(value);
    }
  }

  onQuillEditorContentChange() {

    console.log('activar' )
  }

  addImageIcon() {
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
      icon: this.icon ,
      title: this.formy.value.title, 
      subTitle1: this.formy.value.subTitle1,
      subTitle2: this.formy.value.subTitle2,
    }
    this.dataEvent.emit( data);
    this.cambiosRealizados = false;
  }

  deleteElement(){
    this.dataEvent.emit("delete");
  }


}
