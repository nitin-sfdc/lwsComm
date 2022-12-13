import { LightningElement, api, track } from 'lwc';
/* eslint-disable no-console */
 /* eslint-disable no-alert */
export default class Paginator extends LightningElement {
    
    @api
    changeView(str){
        if(str === 'trueprevious'){
            // this.template.querySelector('lightning-button.Previous').disabled = true;
            this.template.querySelector('[data-id="previous"]').disabled=true;

        }
        if(str === 'falsenext'){
            // this.template.querySelector('lightning-button.Next').disabled = false;
            this.template.querySelector('[data-id="next"]').disabled=false;

        }
        if(str === 'truenext'){
            // this.template.querySelector('lightning-button.Next').disabled = true;
            this.template.querySelector('[data-id="next"]').disabled=true;

        }
        if(str === 'falseprevious'){
            // this.template.querySelector('lightning-button.Previous').disabled = false;
            this.template.querySelector('[data-id="previous"]').disabled=false;

        }
    }
    renderedCallback(){
        //   this.template.querySelector('lightning-button.Previous').disabled = true;

         this.template.querySelector('[data-id="previous"]').disabled=true;


        //   data-id="overview"
    }
    previousHandler1() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler1() {
        this.dispatchEvent(new CustomEvent('next'));
    }
    FirstPageHandler1(){
        this.dispatchEvent(new CustomEvent('firstpage'));
    }
    LastPageHandler1(){
        this.dispatchEvent(new CustomEvent('lastpage'));
    }
    changeHandler(event){
        event.preventDefault();
        const s_value = event.target.value;
        const selectedEvent = new CustomEvent('selected', { detail: s_value});

        this.dispatchEvent(selectedEvent);
 
    }
}