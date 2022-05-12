import { LightningElement, track, api } from 'lwc';
import sendOtp from '@salesforce/apex/OTPUtility.sendOtp'
import validateOTP from '@salesforce/apex/OTPUtility.validateOTP'


import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SendOtpComponant extends LightningElement {

    @api
    recordId;
    message;
    error;

    @track
    timer = 10;

    @track
    otpInput=''
    
    @track
    resnedButtonstate = true;   

    showSendRsendButton = false;
    
    @track
    isOtpValidate = false;    


    handleSendOtp() { 

        sendOtp({ contactId: this.recordId }).then((response) => {
            console.log("response" + response);
            this.message = response;
            this.showToast('Sucess', 'OTP sent to email', 'success');
            this.startTimer();
         }).catch((err) => { 
            console.log("err" + err);
            this.error = 'Error';
        })


    }


    handleResend() { 
        
        this.otpInput = " ";
        this.handleSendOtp();
    }

    handleSubmitOtp() { 

        const element = this.template.querySelector('[data-id="OTP"]');

         validateOTP({ contactId: this.recordId , otp:element.value}).then((response) => {
             console.log("response" + response);
             this.isOtpValidate = true;
             this.showToast('Sucess','Hi '+response,'success');
    
         }).catch((error) => { 
           
             console.log("err" + error);
             let errorMessage = '';


             if (error.body.message) {
                 errorMessage = error.body.message;
             }
             
             this.showToast('FAIL', "Error "+errorMessage,'error');
             
             
        })


    }

    handleOtpInput(event) { 

        
        let response = event.target.value;

        if (response.length == 5) {
            this.resnedButtonstate = false;
        } else { 
            this.resnedButtonstate = true;
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


    startTimer() { 

        const element = this.template.querySelector('[data-id="RESEND-OTP"]');

        this.timer = 10;
        this.showSendRsendButton = false; 
        var intervalID=setInterval(() => {  
            this.timer = this.timer - 1;
            if (this.timer == 0) { 
             this.showSendRsendButton = true;   
             clearInterval(intervalID);
            }

        }, 1000);  
    }




}