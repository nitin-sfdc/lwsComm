import { LightningElement, wire } from 'lwc';

import getAccountInfo from '@salesforce/apex/AccountDetailController.getAccountInfo' 

export default class Displaydata extends LightningElement {

    columns = [{label: 'ID',fieldName: 'ID'},{label: 'Name',fieldName: 'Name'}];

    @wire(getAccountInfo) accountList;
}