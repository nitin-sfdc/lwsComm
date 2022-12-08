import { api, LightningElement } from 'lwc';
import LightningModal from 'lightning/modal';


export default class CreateContactFlow extends LightningModal {

    @api
    content


    handleStatusChange(event) {

        if(event.detail.status=='FINISHED'){
            console.log(' ** handleStatusChange FINISHED');

           // this.dispatchEvent(new CustomEvent('select'));
            this.close('okay'); 

        }
    }

    get inputVariables() {
        return [
            {
                name: 'recordId',
                type: 'String',
                value: this.content
            }
        ];
    }
}