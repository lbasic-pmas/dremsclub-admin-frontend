import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-element-menu-buttons',
  templateUrl: './element-menu-buttons.component.html',
  styleUrls: ['./element-menu-buttons.component.scss']
})
export class ElementMenuButtonsComponent implements OnInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();
  
  formy: any;
  fontSize: any = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
  fontWeight: any = [100, 200, 300, 400, 500, 600, 700, 800, 900]
  cambiosRealizados: boolean = false; 

  color: ThemePalette = 'primary';
  touchUi = false;

  constructor() {

    this.formy = new FormGroup({
      active: new FormControl( '' , [ Validators.required ]),
      fontSize: new FormControl( '' , [ Validators.required ]),
      color: new FormControl( '' , [ Validators.required ]),
      weight: new FormControl( '' , [ Validators.required ]),

    });
   }

  ngOnInit(): void {
    
    if(this.data){
      try {
        
        this.setControlValue('active', this.data.active);
        this.setControlValue('fontSize', this.data.fontSize);
        this.setControlValue('color', this.data.color.hex);
        this.setControlValue('weight', this.data.weight);

      } catch (error) {
        console.log(error)
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

  onSubmited(){
    let data = {
      active : this.formy.value.active,
      fontSize: this.formy.value.fontSize,
      color:  this.formy.value.color,
      weight: this.formy.value.weight,
     }
     this.dataEvent.emit(data);
     this.cambiosRealizados = false;
   }

   deleteSlider(){
    this.dataEvent.emit("delete");
   }

}
