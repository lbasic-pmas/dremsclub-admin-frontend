import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-element-slider',
  templateUrl: './element-slider.component.html',
  styleUrls: ['./element-slider.component.scss']
})
export class ElementSliderComponent implements OnInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  sliders:any = []

  constructor( ) { 
   
  }

  ngOnInit(): void {
    this.sliders = [...this.data]
  }

  onSubmited(){
     this.dataEvent.emit(this.sliders);
   }

  deleteElement(){
    this.dataEvent.emit("delete");
  }

  handleDataSliders(data: any, index: any) {
    if(data === "delete"){
      this.sliders.splice(index, 1);  
      this.onSubmited()   
    }else {
      this.sliders[index] = data;
      this.onSubmited()
    }
  }

  addSlider(){
    let data = {
      imageDesktop: 'assets/images/notImage.png' ,
      imageMobile: 'assets/images/notImage.png' ,
      title: '' ,
      subTitle: '',
      description: '',
    }
    this.sliders.push(data)
    this.onSubmited()
  }

}
