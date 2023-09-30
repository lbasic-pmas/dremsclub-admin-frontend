import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExperienceImageComponent } from 'src/app/dialog/experience-image/experience-image.component';



@Component({
  selector: 'app-component-social-media',
  templateUrl: './component-social-media.component.html',
  styleUrls: ['./component-social-media.component.scss']
})
export class ComponentSocialMediaComponent implements OnInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  formy: any;
  icon: any = 'assets/images/notImage.png'
  cambiosRealizados: boolean = false; 

  constructor(public dialog: MatDialog) { 
    this.formy = new FormGroup({
      title: new FormControl( '' , [ Validators.required ]),
      description: new FormControl( '' , [ Validators.required ]),
      url: new FormControl( '' , [ Validators.required ]),
    });
  }

  ngOnInit(): void {

    if(this.data){
      try {
        this.setControlValue('title', this.data.title);
        this.setControlValue('description', this.data.description);
        this.setControlValue('url', this.data.url);
        this.icon = this.data.icon;
      } catch (error) {
        
      }
    }

    this.formy.valueChanges.subscribe(() => {
      this.cambiosRealizados = true;
    });

  }

  setControlValue(controlName: string, value: any) {
    if (value !== undefined && value !== null) {
      this.formy.controls[controlName].setValue(value);
    }
  }

  addIcon(){
    this.icon = '/assets/images/logo.png';
    this.cambiosRealizados = true;
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

  deleteIcon(){
    this.icon = '';
    this.cambiosRealizados = true;
  }

  addSocialMedia(){
    let data = {
      title: this.formy.value.title,
      description: this.formy.value.description,
      url: this.formy.value.url,
      icon: this.icon,
      }
      this.dataEvent.emit(data);
      this.cambiosRealizados = false;
  }

  deleteSocialMedia(){
    this.dataEvent.emit("delete");
  }
}
