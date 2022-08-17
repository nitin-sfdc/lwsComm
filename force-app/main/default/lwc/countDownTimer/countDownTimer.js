import { api, LightningElement, track ,wire} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import CLOSE_DATE from '@salesforce/schema/Opportunity.CloseDate';


export default class CountDownTimer extends LightningElement {
    
    @track
    textSecond;

    @track
    textMinute;
    
    @track
    textHour;
    
    @track
    textDay;

    @api
    recordId

    @track
    isClosedDatePassed=true;

    @track
    isDataLoaded=false;

    @track
    labelSecond


    @wire(getRecord, { recordId: '$recordId', fields: [CLOSE_DATE]})
     wiredRecord({ error, data }) {
        if (error) {
            alert('Data error');
        } else if (data) {
            this.isDataLoaded=true;
            this.checkDate(getFieldValue(data, CLOSE_DATE));
        }
    }

    checkDate(oppCloseDate){
        const closeDate= new Date(oppCloseDate);
        const today= new Date();
        if(closeDate>today){
            this.isClosedDatePassed=false;
            this.startTimer(oppCloseDate);
        }
    }

    startTimer(oppCloseDate){
     
        setInterval(() => {
                    const countDate = new Date(oppCloseDate).getTime();
                    const now = new Date().getTime();
                    const remainingTime = countDate - now;
                    const second = 1000;
                    const minute = second * 60;
                    const hour = minute * 60;
                    const day = hour * 24;

                    this.textDay = Math.floor(remainingTime / day);
                    this.textHour = Math.floor((remainingTime % day) / hour);
                    this.textMinute = Math.floor((remainingTime % hour) / minute);
                    this.textSecond = Math.floor((remainingTime % minute) / second);

                    if(this.textSecond>1){
                        this.labelSecond='Seconds'
                    }else{
                        this.labelSecond='Second'
                    }


        },1000)
    }



}