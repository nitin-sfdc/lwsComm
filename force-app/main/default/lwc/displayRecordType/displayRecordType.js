import { LightningElement, track, wire } from 'lwc';

import getRecordTypeObjectAccount from '@salesforce/apex/GetRecordTypeHelper.getRecordTypeObjectAccount'
import getContactWithName from '@salesforce/apex/GetRecordTypeHelper.getContactWithName'
import getAccountDetails from '@salesforce/apex/GetRecordTypeHelper.getAccountDetails'


export default class DisplayRecordType extends LightningElement {


    @track
    recordTypeDatass

    @track
    accountDetails    

    contactData;

    searchParam="";
    
    @wire(getRecordTypeObjectAccount)
    recordTypeData

    @wire(getContactWithName, { sssname: '$searchParam' })
    wiredData({ error, data }) {
      if (data) {
          console.log('Data', data);
          this.contactData = data;
          //alert('Data');
      } else if (error) {
          console.error('Error:', error);
           alert('Error');
      }
    }

    @wire(getAccountDetails, { searchString: '$searchParam' })
    wiredData({ error, data }) {
      if (data) {
          //console.log('Data', data);
          this.accountDetails = data;

            this.accountDetails.forEach(element => {
            console.log("Contact "+element.Contacts);
        });

          
        //   alert('getAccountDetails')
      } else if (error) {
         console.error('Error:', error);
      }
    }



    handlechange(event) { 

        //alert('VALUE' + event.target.value)
        
        this.searchParam = event.target.value;

    }


}