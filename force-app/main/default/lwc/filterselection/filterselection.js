import { LightningElement ,wire,track} from 'lwc';
import { publish,subscribe, MessageContext } from 'lightning/messageService';
import FILTER_DETAILS from '@salesforce/messageChannel/Filter_Detail__c';
import SELECTED_FILTER_DETAILS from '@salesforce/messageChannel/Selected_Filter_Detail__c';




export default class Filterselection extends LightningElement {


    subscription = null;

    filterdata;
  
  @track
  TypeOptions=[];


    @wire(MessageContext)
    messageContext; 


     connectedCallback() {
    
     this.subscribeToMessageChannel();
    }


    subscribeToMessageChannel() {
    
      this.subscription = subscribe(
      this.messageContext,
      FILTER_DETAILS,
      (message) => this.handleMessage(message)
    );

    // create array 

      
    }
    
    handleMessage(message) {
        this.filterdata = message.filterdata;
        let options = [];
        

        
        this.filterdata =  this.filterdata.map((item) => 
          Object.assign({}, item, {label:item.animal_type,value:item.animal_type})
        )

       this.filterdata.forEach((ele) => { 

         options.push({ label: ele.label, value: ele.value });
 
      })
      
      
        // var len = this.filterdata.length;

        // for (var i = 0; i<len;i++){
        //    this.filterdata[i].global = true;
        // }
        this.TypeOptions = options;
        console.log("Filter options" + JSON.stringify( options));
        console.log("Filter filterdata" + JSON.stringify( this.filterdata));


      

    }

    handlechange(event) { 

      // alert('handlechange'+event.target.value);
      this.publishSelectedFilterData(event.target.value);
    }

    publishSelectedFilterData(selectedvalue) { 
   
       const payload = { 
         filterdata:selectedvalue
        };
        
        publish(this.messageContext, SELECTED_FILTER_DETAILS, payload);

     }

        
  
    

}