import { LightningElement } from 'lwc';

export default class MyParentCOmponant extends LightningElement {


    onEventDataReciaved(event) { 

        alert('onEventDataReciaved');
     }

}