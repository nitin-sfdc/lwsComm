import { api, LightningElement, track } from 'lwc';
import labelName from '@salesforce/label/c.Error_Message';

export default class MyChildComponant extends LightningElement {


    @api
    nameFromParent = "";    


      handleButtonCLick() { 

          console.log(this.nameFromParent);
          alert('HIii fgfg '+labelName); 
        
        //  var ss = new CustomEvent("senddata");
        //  this.dispachEvent(ss);

          
        this.dispatchEvent(new CustomEvent('child'));

     }


}