import { api, LightningElement, track,wire } from 'lwc';
import getAccountRelatedContact from '@salesforce/apex/ContactUtility.getAccountRelatedContact';
import { updateRecord,deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import LightningConfirm from "lightning/confirm";

import { refreshApex } from '@salesforce/apex';
import CreateContactFlow from 'c/createContactFlow';
import CreateContactFieldSet from 'c/createContactFieldSet';
import CreateContactManually from 'c/createContactManually';



export default class RelatedContact extends LightningElement {

    @api
    recordId

    @track
    contactList;

    saveDraftValues = [];

    isCreateContactClicked = false;


    columns = [
    {label: 'ID',fieldName: 'Id'},
    {label: 'First Name',fieldName: 'FirstName',editable: true, type: 'text'},
    {label: 'Last Name',fieldName: 'LastName',editable: true, type: 'text'},
    {label: 'Email Id',fieldName: 'Email',editable: true, type: 'Email'},
    {
        type:"button",
        fixedWidth: 150,
        typeAttributes: {
            label: 'Delete',
            name: 'Delete',
            variant: 'brand'
        }
    }
    
    ];


    @wire(getAccountRelatedContact, {accountRecordId:'$recordId'})
    contactData(result) {
        this.contactList = result;
        if (result.error) {
            this.contactList = undefined;
        }
    };

    getRelatedContacts(){

        getAccountRelatedContact({ accountRecordId: this.recordId}).then((result)=>{
            //alert(''+JSON.stringify(result));
            console.log(' ** getAccountRelatedContact');
            console.log(' ** result.size '+result.length);
            this.contactList=result;
        }).catch((error) => {
            alert('error');
        })

    }

    
    handleSave(event) {
        this.saveDraftValues = event.detail.draftValues;
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });

        alert(JSON.stringify(recordInputs));
 
        // Updateing the records using the UiRecordAPi
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.showToast('Success', 'Records Updated Successfully!', 'success');
            this.saveDraftValues = [];
            return this.refresh();
        }).catch(error => {
            this.showToast('Error', 'An Error Occured!!'+JSON.stringify(error), 'error');
        }).finally(() => {
            this.saveDraftValues = [];
        });
    }

   async handleRowAction(event) {
        const result = await LightningConfirm.open({
          message: "Are you sure you want to Delete record",
          theme: "success",
          label: "Delete Record",
        }).then((result) => {
            if(result){
                this.deleteContactRecord(event.detail.row.Id);
            }

        });
      }


  deleteContactRecord(contactRecordID){

    deleteRecord(contactRecordID).then(() => {
        console.log('***Delete Success');
        this.showToast('Success', 'Records Deleted Successfully!', 'success');
        refreshApex(this.contactList);

      })
      .catch(error => {
          console.log('**error**',error);
          this.showToast('Error', 'An Error Occured!!'+JSON.stringify(error), 'error');

      });

  }    

    handleCreateContact(event){

         CreateContactFlow.open({
                size: 'large',
                description: 'Accessible description of modal\'s purpose',
                content: this.recordId,
          }).then((result)=>{
            this.updateContactList(result);
          });
    }

    handleCreateContactFieldSet(event){

        CreateContactFieldSet.open({
               size: 'large',
               description: 'Accessible description of modal\'s purpose',
               accountRecordID: this.recordId,
         }).then((result)=>{
            this.updateContactList(result);
         });
   }

   handleCreateContactManually(event){

    CreateContactManually.open({
        size: 'large',
        description: 'Accessible description of modal\'s purpose',
        accountRecordID: this.recordId,
        content:this.recordId
    }).then((result)=>{
    console.log(' ** then result');
    this.updateContactList(result);
  });



   }

   updateContactList(result){

    if(result=='okay'){
        this.showToast('Success', 'Records Created Successfully!', 'success');
        refreshApex(this.contactList);
        }
   } 

    showToast(title,message,variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
    
 
    async refresh() {
        await  refreshApex(this.contactList);
    }
     


    
   

}