import { LightningElement ,track,api,wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const FIELDS = [
    'Contact.Name',
    'Contact.Title',
    'Contact.Phone',
    'Contact.Email',
    
];
import senPaymentLink from '@salesforce/apex/PaymentUtility.senPaymentLink';
import createPaymentRequest from '@salesforce/apex/PaymentUtility.createPaymentRequest';
import getStringBody from '@salesforce/apex/PaymentUtility.getStringBody';
import getPaymentDetsils from '@salesforce/apex/PaymentUtility.getPaymentDetsils';
import { getRecordNotifyChange } from "lightning/uiRecordApi";






export default class ShowPaymentPopup extends LightningElement {

    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    @track isModalOpen = false;

    @track
    amount

    handleChange(event){

        this.amount=event.target.value;
    }

    get name() {
        return this.contact.data.fields.Name.value;
    }

    get title() {
        return this.contact.data.fields.Title.value;
    }

    get phone() {
        return this.contact.data.fields.Phone.value;
    }

    get email() {
        return this.contact.data.fields.Email.value;
    }


    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
        this.handleSubmit();
    }

    handleSubmit(){
        //alert(this.panNumber)

        createPaymentRequest({amount:this.amount,contactId:this.recordId}).then((response) =>{
           
           // alert('record created successfully'+JSON.stringify(response));
            this.sendPaymentLink(response.Id);

        }).catch((error)=>{
            alert('record created error'+error);
        })
    }  


    sendPaymentLink(referenceId){
        getRecordNotifyChange([{ recordId: referenceId }]);
        this.getPaymentDetails(referenceId);
    
    }

    getPaymentDetails(referenceId){

      getPaymentDetsils({referenceId:referenceId}).then((paymentDetails) =>{
            console.log("paymentDetails "+JSON.stringify(paymentDetails));
            //alert(JSON.stringify(paymentDetails));
            this.genarateRequestBody(paymentDetails);

        }).catch((error)=>{
            alert('Error in getting the payment detsils'+error);
        })

    }

    genarateRequestBody(paymentDetails){
      

        getStringBody({}).then((response) =>{
            console.log("Request string "+JSON.stringify(response));
            let requestObject=JSON.parse(response);

            requestObject.amount=paymentDetails.Amount__c*100;
            requestObject.reference_id=paymentDetails.Id;
            requestObject.customer.Name=paymentDetails.Customer__r.Name;
            requestObject.customer.email=paymentDetails.Customer__r.Email;
            requestObject.customer.contact=paymentDetails.Customer__r.Phone;
                        
           // alert(JSON.stringify(requestObject));


            senPaymentLink({requestString:JSON.stringify(requestObject)}).then((response) =>{
            console.log('link sent successfully '+JSON.stringify(response));
            //alert('link sent successfully'+JSON.stringify(response));
            this.showToast('Sucess','Link sent successfully on the contact email and  phone','success');


        }).catch((error) =>{
            alert('error');
        })






        }).catch((error) =>{
            alert('error'+error);
        })
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


    

    
       

}