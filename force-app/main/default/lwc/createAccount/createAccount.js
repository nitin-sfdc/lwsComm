import { LightningElement, track } from 'lwc';

import ACCOUNT from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import create from '@salesforce/apex/AccountCreateUtility.create'


export default class CreateAccount extends LightningElement {

    @track
    acountName=ACCOUNT_NAME;    

    rec = {
        Name: this.acountName
    }

    handleNameChange(event) { 

        this.rec.Name = event.target.value;
        console.log('CreateAccount' + this.rec.Name);

    }

    handleClick(event) { 

        create({ acc: this.rec }).then((response) => {

            alert('Record created ');
         }).catch((error) => {

            alert('Something went wrong');
        })

    }
}