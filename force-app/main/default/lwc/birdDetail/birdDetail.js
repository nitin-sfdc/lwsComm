import { LightningElement ,wire} from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ANIMAL_DETAILS from '@salesforce/messageChannel/Animal_Detail__c';

export default class BirdDetail extends LightningElement {



  

    subscription = null;

    @wire(MessageContext)
    messageContext;  

    animalObjectData

    connectedCallback() {
    
     this.subscribeToMessageChannel();
    }


    subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      ANIMAL_DETAILS,
      (message) => this.handleMessage(message)
    );
    }
    
    handleMessage(message) {
        this.animalObjectData = message.bidrdata;
    }
  
}