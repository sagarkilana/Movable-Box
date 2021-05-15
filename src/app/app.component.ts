import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovableBox';
  boxes=[]
  info:string=''
  postioinvalueArray: any[];
  selectedBox:any;
  lastBoxId=0;
  isKeyboardOn: boolean=true;
  constructor(){
    
  }
  // @HostListener('window:keypress', ['$event'])
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(this.isKeyboardOn){
      if(this.selectedBox && this.selectedBox.id){
        console.log(event,this.selectedBox.id) ;
    
          for(var i=0;i<this.boxes.length;i++){
            if(this.boxes[i].id==this.selectedBox.id){
              if(event.key=='w' || event.key=='ArrowUp'){
                var top=this.boxes[i].top-10;
                if(top>101){
                  this.boxes[i].top+= -10;
                }else{
                  this.boxes[i].top= 101;
                }
              }
              if(event.key=='s'|| event.key=='ArrowDown'){
                var bottom=this.boxes[i].top+10;
                if(bottom<249){
                  this.boxes[i].top+= 10;
                }else{
                  this.boxes[i].top= 249;
                }
              }
              if(event.key=='a' || event.key=='ArrowLeft'){
                var left=this.boxes[i].left-10;
                if(left>21){
                  this.boxes[i].left-= 10;
                }else{
                  this.boxes[i].left= 21;
                } 
              }
              if(event.key=='d' || event.key=='ArrowRight'){
                var right=this.boxes[i].left+10;
                if(right<569){
                  this.boxes[i].left+= 10;
                }else{
                  this.boxes[i].left= 568;
                } 
              }
              if( event.key=='Delete'){
             
                this.boxes.splice(i,1)
                this.selectedBox= this.boxes[i-1]
                if(this.selectedBox) {
                  this.info=this.selectedBox.name+': x: '+this.selectedBox.left+' y: '+this.selectedBox.top
                }else{
                  this.info='Please select the box to move the box'
                }
              }else{
                this.selectedBox= this.boxes[i]
                this.info=this.selectedBox.name+': x: '+this.selectedBox.left+' y: '+this.selectedBox.top
              }
              
            }
          }
        }else{
          this.info='Please select the box to move the box'
        }
    }else{
      this.info='Please turn on Keyboard input to move the box'
    }
  
    
    
  }
  
  ngOnInit(){
    this.info='Please add box'
  }

  addBox(){
    var thisTemp=this;
    var uniqueId=this.lastBoxId+1;
    var box={
      // left:(this.boxes.length)*100+30,
      left:21,
      top:101,
      id:uniqueId,
      name:'Box '+uniqueId

    }
    this.info=box.name+': x: '+box.left+' y: '+box.top
    this.boxes.push(box)
    this.lastBoxId=uniqueId;
  }
  selectBox(box){
    if(box) {
      this.selectedBox=box
      this.info=box.name+': x: '+box.left+' y: '+box.top
    }
  }
  toggleKeyboard(){
    console.log('ss')
    this.isKeyboardOn=!this.isKeyboardOn
    if(!this.isKeyboardOn){
      this.info='Please turn on Keyboard input to move the box'
    }else if(this.selectedBox){
      this.info=this.selectedBox.name+': x: '+this.selectedBox.left+' y: '+this.selectedBox.top
    }else{
      this.info='Please select the box to move the box'

    }
   
  }
}