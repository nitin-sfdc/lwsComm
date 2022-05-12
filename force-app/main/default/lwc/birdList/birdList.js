import { LightningElement,wire } from 'lwc';
import { publish, MessageContext,subscribe } from 'lightning/messageService';
import ANIMAL_DETAILS from '@salesforce/messageChannel/Animal_Detail__c';
import FILTER_DETAILS from '@salesforce/messageChannel/Filter_Detail__c';
import SELECTED_FILTER_DETAILS from '@salesforce/messageChannel/Selected_Filter_Detail__c';


export default class BirdList extends LightningElement {

    @wire(MessageContext)
    messageContext;

    birdList = [];
    filteredBirdList = [];

    connectedCallback() {
        // alert('connectedCallback');
      this.hanleClick();
      this.subscribeToMessageChannel();

    }

  subscribeToMessageChannel() {
    
      this.subscription = subscribe(
      this.messageContext,
      SELECTED_FILTER_DETAILS,
      (message) => this.handleSelectedFilteredData(message)
    );

      
    }


    hanleClick() { 

        fetch('https://zoo-animal-api.herokuapp.com/animals/rand/10').then((response) => {

               if(response.ok) {
                    return response.json();
                } else {
                    throw Error(response);
                }

        }).then(json => {

            //console.log('json' + Json.stringify(json));

         
          this.birdList = json;
          this.filteredBirdList = json;

        

          
          // const unique = [...new Set(this.birdList.map(item => item.animal_type))]; // [ 'A', 'B']
          // console.log(JSON.stringify(unique));


           var filtered = this.birdList.filter(function({animal_type}) {
           var key = `${animal_type}`;
            return !this.has(key) && this.add(key);
         }, new Set);

          this.publishFilterData(filtered);

            
           


        }).catch((error) => {
              alert('Handle catch '+error.message);
             
         })
    }

    handleDetailsClick(event) {
        var id = event.currentTarget.dataset.id;
        console.log('IDD' + id);
        var obj = this.birdList.find(obj => obj.id == id);
        console.log('indexObObject'+obj.name);
        this.publishAnimalSelectedFilter(obj);
        
    }


  publishAnimalSelectedFilter(selectedDetailObject) { 

     const payload = { 
      operator: 'add',
      constant: 1,
      bidrdata:selectedDetailObject
    };
      
    publish(this.messageContext, ANIMAL_DETAILS, payload);

    }
  
    handleSelectedFilteredData(message) { 

      //alert('handleSelectedFilteredData' + message.filterdata)
      this.showListAccordingToFilter(message.filterdata);

    }

    showListAccordingToFilter(selectedFilter) { 

      //alert('showListAccordingToFilter' + selectedFilter);

     this.filteredBirdList= this.birdList.filter(function (el) {
        return el.animal_type === selectedFilter;
      });

      this.publishAnimalSelectedFilter(null);

    }
  
  


  publishFilterData(unique) { 
   
    const payload = { 
     
      filterdata:unique
    };
        
    publish(this.messageContext, FILTER_DETAILS, payload);

  }

}