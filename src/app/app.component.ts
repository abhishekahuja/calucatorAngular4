import { Component } from '@angular/core';
import { b } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display : String  = '0';
  constructor(){}
//following method gets the 
  getValue(value){
    //check if there is an error
    if(this.display !== 'Error'){
      //check if the display is set to 0
      if(this.display=='0'){
        if(value!=='+' && value!=='-' && value!=='*'){
          this.display = value;
        }
      }//replace operator if display has an operator at the end.
      else if(value=='+' ||value=='-' || value=='*'){
        var display = this.display.split('');
        if(this.inArray(display[display.length-1],['+','-','*'])){
          display[display.length-1] = value;
          this.display = display.join('');
        }else{
          this.display = this.display +value;
        }
      }
      else{
        //appending value to the display
        this.display = this.display +value;
      }
    }
    
  }

  equals(){
    // toShow array is an array containing elements split by operators
    var toShow = this.display.split(/([*\/]|\b\s*-|\b\s*\+)/g);

    for(let i = 0; i < toShow.length; i++){
       //for checking precendence
      ['*','+','-'].forEach(operator => {
        while(this.inArray(operator, toShow)){
          let i = toShow.indexOf(operator);
          switch(operator){
            case '+':
            toShow[i-1] = (parseInt(toShow[i-1]) + parseInt(toShow[i+1])).toString();
            break;
            case '*':
            toShow[i-1] = (parseInt(toShow[i-1]) * parseInt(toShow[i+1])).toString();
            break;
            case '-':
            toShow[i-1] = (parseInt(toShow[i-1]) - parseInt(toShow[i+1])).toString();
            break;
            default:
            break;
          }
          toShow.splice(i,2);
        }
      });
      if(toShow[0]== "NaN"){
        this.display ='Error';
      }else{
      this.display = toShow[0];
      }
    }
  }

  inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

  clear(){
    this.display ='0';
  }
}
