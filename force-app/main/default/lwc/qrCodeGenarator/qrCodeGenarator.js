import { LightningElement, track } from 'lwc';
import convertToBASE64 from '@salesforce/apex/ExchangeController.convertToBASE64';

export default class QrCodeGenarator extends LightningElement {

    @track
    srcData="";

    @track
    amount=""
    
    @track
    upiId=""

    @track
    validateBtnState=true;


    connectedCallback(){
        //this.handleCLick();
        // this.convert();
    }

    handleAmountChange(event){

        this.amount=event.target.value;
        this.updateButtonState();

    }

    handleUPIIDChange(event){
        this.upiId=event.target.value;
        this.updateButtonState();
    }

    updateButtonState(){ 

        // alert(this.upiId);

        this.validateBtnState=! ( (this.amount.length>0) && (this.upiId.length>0) ) ;

    }

    convert(myData){

        convertToBASE64({ss: myData}).then((data) => {

            //alert('BASE64: ' + data);
            console.log(JSON.stringify(data));
            this.srcData="data:image/svg+xml;base64,"+data;
            // base64Data=JSON.stringify(data);

        }).catch((error) => {
            alert('BASE64: errrr' + error.message);

        });


    }

    handleCLick(){

        fetch("https://upiqr.in/api/qr?name=SantanuSinha&vpa="+this.upiId+ "&amount="+this.amount)
         .then(response => {
            // alert(response);
            return response.text();
        })
         .then(svg => {
            // alert(svg);
            this.convert(svg);
        }).catch((errr)=>{
            alert(errr);
        })


    }
}