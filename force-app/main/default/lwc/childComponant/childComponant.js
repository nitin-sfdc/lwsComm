import { LightningElement } from 'lwc';

export default class ChildComponant extends LightningElement {

    handleClick(event) { 
        //alert('handleClick');
        //this.dispatchEvent(new CustomEvent('senddata'));

        this.dispatchEvent(new CustomEvent('child', {

            detail: {
                name:"sachinnnnnn"
            }
        }));

    }
}