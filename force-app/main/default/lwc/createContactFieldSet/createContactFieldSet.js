import LightningModal from 'lightning/modal';
import { api } from 'lwc';

export default class CreateContactFieldSet extends  LightningModal  {

   
    @api
    accountRecordID

    isLoading=false;

    
    handleSuccess(event){
        this.isLoading=false;
        this.close('okay'); 
    }


    onSubmitHandler(event){
        this.isLoading=true;
        event.preventDefault();
        const fields = event.detail.fields;
        fields['AccountId'] =  this.accountRecordID
        // alert(JSON.stringify(fields));
        this.template.querySelector('lightning-record-edit-form').submit(fields);

    }



    handleError(event){
        alert(JSON.stringify(event));
    }

}