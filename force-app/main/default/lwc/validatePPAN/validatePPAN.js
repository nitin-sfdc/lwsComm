import { LightningElement, track } from 'lwc';
import checkPANStatus from '@salesforce/apex/ExchangeController.checkPANStatus';


export default class ValidatePPAN extends LightningElement {

    @track
    panNumber

    @track
    validateBtnState=true;

    @track
    finalOutPUT

    @track
    source

    handleChange(event){
        
        this.panNumber = event.target.value.toUpperCase();
        this.updateButtonState();

    }

    handleCheckStatusClick(){
        alert(this.panNumber)

        checkPANStatus({panNumber:this.panNumber}).then((response) =>{
            //alert('Something');
            //alert(JSON.stringify(JSON.parse(response.replace(/\r?\n|\r/g, ''))));

            if(response!= null) {   
                const dataResponse=JSON.parse(response.replace(/\r?\n|\r/g, ''))
                this.checkData(dataResponse);
            }

        }).catch((error) =>{
            alert('error');
        })

    }  

    updateButtonState(){ 

        this.validateBtnState=!(this.panNumber.length==10);

    }

    checkData(panResponses){

        if(panResponses.status=='completed'){
            // alert(panResponses.result);
            this.finalOutPUT= panResponses.result.source_output.name_on_card
            this.source= panResponses.result.source_output.source;
            alert(this.finalOutPUT);
        }else{
            alert('NOT A VALID PAN CARD');
        }

    }

}