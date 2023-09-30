import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-element-cards',
  templateUrl: './element-cards.component.html',
  styleUrls: ['./element-cards.component.scss']
})
export class ElementCardsComponent implements OnInit {
  @Input() data : any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  elementos:any = []

  constructor() { }

  ngOnInit(): void {
    this.elementos = [...this.data]
  }

  onSubmited(){
    this.dataEvent.emit(this.elementos);
  }

  deleteElement(){
    this.dataEvent.emit("delete");
  }


  addElement(){
    let data = {
      imageBackground: 'assets/images/notImage.png' ,
      icon: 'assets/images/notImage.png' ,
      title: '' ,
      subTitle: '',
      urlButton: '',
      buttonTitle: '',
      col: 1,
      btnActive: true,
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
