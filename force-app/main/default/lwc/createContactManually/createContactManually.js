import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import { createRecord } from "lightning/uiRecordApi";
import CONTACT_OBJECT from "@salesforce/schema/Contact";



export default class CreateContactManually extends LightningModal {

    @api
    accountRecordID

    isLoading=false;

    fields ={};

    handleInputChange(event) {

        var  value = event.target.value;
        var datasetId=event.target.dataset.id;
        
        if(value.length>0){
  
          this.fields =({
              ...this.fields ,[datasetId]:value
            });
      
        }else{
          delete  this.fields [datasetId];
        }
  
    }

    validateFields() {
        let isValid = true;

        this.template.querySelectorAll('.validate').forEach(element => {
           
            if(!element.checkValidity()) {
               element.reportValidity();
                isValid = false;
            }


        });

        return isValid;
    }

    handleSubmit(event){

        this.fields['AccountId'] =  this.accountRecordID
        //alert(this.validateFields());

        if(this.validateFields()){
            this.isLoading=true;
            this.createContactRecord();
        }else{
            alert('Please enter all fields');
        }
    }

    createContactRecord() {
  
        const recordInput = {
          apiName:'Contact',
          fields: this.fields
        };


            
            //5. Invoke createRecord by passing the config object
        createRecord(recordInput).then((record) => {
          //console.log(record);
        //   alert('record');
        this.isLoading=false;
        this.close('okay'); 
        }).catch((error)=>{
            this.isLoading=false;
            alert('error'+ JSON.stringify(error));
        });
      }

    



}