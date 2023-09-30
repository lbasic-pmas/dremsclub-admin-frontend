import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formy: any;
  data: any;
  cambiosRealizados: boolean = false; 
  hide = true;

  constructor(  ) { 
    this.formy = new FormGroup({
      name: new FormControl( '' , [ Validators.required ]),
      lastName: new FormControl( '' , [ Validators.required ]),
      email: new FormControl( '' , [ Validators.required ]),

      password: new FormControl( '' , [ Validators.required ]),
      newPassword: new FormControl( '' , [ Validators.required ]),
      newPasswordRepeat: new FormControl( '' , [ Validators.required ]),


    });
  }


  ngOnInit(): void {
    if(this.data){
      try {
        
        //this.setControlValue('name', this.data.text1.text);

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

     }

     console.log(this.formy.value)
     this.cambiosRealizados = false;
   }

}
