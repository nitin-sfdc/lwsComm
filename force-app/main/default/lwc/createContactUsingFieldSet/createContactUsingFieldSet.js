import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import { createRecord } from "lightning/uiRecordApi";
import CONTACT_OBJECT from "@salesforce/schema/Contact";

export default class CreateContactUsingFieldSet  extends LightningModal {

    @api
    fields

    @api
    objectName

    @api
    accountRecordID


    isLoading=false;
    

    onSubmitHanlder(event)
    {
       // const inputFields = e.detail.fields;
     //   this.template.querySelector('lightning-record-edit-form').submit(inputFields);

        this.isLoading=true;
        event.preventDefault();
        const fields = event.detail.fields;
        fields['AccountId'] =  this.accountRecordID
        //alert(JSON.stringify(fields));
        this.template.querySelector('lightning-record-edit-form').submit(fields);

    }
    validateFields() {
        return [...this.template.querySelectorAll("lightning-input-field")].reduce((validSoFar, field) => {
            return (validSoFar && field.reportValidity());
        }, true);
    }
    handleSuccess(e)
    {
        //this.showMessage('Record Saved Successfully','success');
        this.isLoading=false;
        this.close('okay'); 
    }
    handleError(e)
    {
        this.template.querySelector('[data-id="message"]').setError(e.detail.detail);
        e.preventDefault();
    }

    showMessage(message,variant)
    {
        const event = new ShowToastEvent({
            title: 'Record Save',
            variant: variant,
            mode: 'dismissable',
            message: message
        });
        this.dispatchEvent(event);
    }


}