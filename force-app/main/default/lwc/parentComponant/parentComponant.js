import { LightningElement, track,wire } from 'lwc';
import getAvailableObjects from '@salesforce/apex/CallFromCustomeButton.getAvailableObjects';


export default class ParentComponant extends LightningElement {

    selectedValue;

    @track
    dataList   = []  
    @track
    error

    options = [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' }
    ]
     sample=[]

    // get options() {
    //     return [
    //         { label: 'New', value: 'new' },
    //         { label: 'In Progress', value: 'inProgress' },
    //         { label: 'Finished', value: 'finished' },
    //     ];
    // }
    

    @wire(getAvailableObjects)
    getAvailableObjects({ error, data }) {
      if (data) {
        console.log('Data', data);
      } else if (error) {
        console.error('Error:', error);
      }
    }


    displayEventData(event) { 

        //const dataV = event.detail.name;

        //alert('Hidddddd '+dataV)
    }

    connectedCallback() { 

       // alert('connectedCallback')

        getAvailableObjects().then(result => {
            //alert('result' + result.size);
            this.dataList = result;
           
           // console.log('result' + result);
          //  console.log('this.dataList' + this.dataList);

            for (var i in this.dataList) {    
                var item = this.dataList[i];   
                this.sample.push({ 
                label : item.named,
                value  : item.named,
                });
              

                //console.log("I is " + i);
                

            }

             this.options = this.sample;

            console.log("this.options " + this.options);
            
        }).catch(err => {
            alert('err');
            error = err;
        })

        
    }

    handleChange(event) {
        this.selectedValue = event.target.value;

    }
}