import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExperienceImageComponent } from 'src/app/dialog/experience-image/experience-image.component';

@Component({
  selector: 'app-element-logo',
  templateUrl: './element-logo.component.html',
  styleUrls: ['./element-logo.component.scss']
})
export class ElementLogoComponent implements OnInit, AfterViewInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();
  
  formy: any;
  logoWeb: any;
  logoMobile: any
  cambiosRealizados: boolean = false; 

  constructor(public dialog: MatDialog) { 
    this.formy = new FormGroup({
      titleLogoWeb: new FormControl( '' , [ Validators.required ]),
      descriptionLogoWeb: new FormControl( '' , [ Validators.required ]),
      titleLogoMobil: new FormControl( '' , [ Validators.required ]),
      descriptionLogoMobile: new FormControl( '' , [ Validators.required ]),
    });
  }

  ngOnInit(): void {
    if(this.data){
      this.setControlLogoWeb('logoWeb', this.data.logo1.img);
      this.setControlLogoWeb('logoMobile', this.data.logo2.img);

      this.setControlValue('titleLogoWeb', this.data.logo1.titulo);
      this.setControlValue('descriptionLogoWeb', this.data.logo1.description);
      this.setControlValue('titleLogoMobil', this.data.logo2.titulo);
      this.setControlValue('descriptionLogoMobile', this.data.logo2.description);
      
    }


    this.formy.valueChanges.subscribe(() => {
      this.cambiosRealizados = true;
    });

  }

  ngAfterViewInit() {
    // Realiza cambios aquí


  }

  setControlValue(controlName: string, value: any) {
    if (value !== undefined && value !== null) {
      this.formy.controls[controlName].setValue(value);
    }
  }

  setControlLogoWeb( logo:any, url:any){
    if(url !== undefined && url !== null){
      if(logo === 'logoWeb'){
        this.logoWeb = url;
      }else{
        this.logoMobile = url;
      }
    }
  }
  

  addLogoWeb() {
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
          this.logoWeb = resultDialog.icon
          this.cambiosRealizados = true;

        }
      }
    );
  }

  addLogoMobile() {
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
          this.logoMobile = resultDialog.icon
          this.cambiosRealizados = true;

        }
      }
    );
  }


  onSubmited(){
    let data = {
      logo1: {
              img : this.logoWeb ,
              titulo: this.formy.value.titleLogoWeb,
              description:  this.formy.value.descriptionLogoWeb,
              } ,
      logo2: {
              img : this.logoMobile,
              titulo: this.formy.value.titleLogoMobil,
              description:  this.formy.value.descriptionLogoMobile,
              } 
      }

    this.dataEvent.emit(data);
    this.cambiosRealizados = false;
  }

}
