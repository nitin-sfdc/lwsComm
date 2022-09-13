import { LightningElement, wire, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import lwcDatatableStyle from "@salesforce/resourceUrl/lwcDatatableStyle";

import getCardDetsils from "@salesforce/apex/lwcSortingDataTableCtrl.getCardDetsils";
const columns = [
     
      {
        label: "Date",
        fieldName: "CreatedDate",
        sortable: "true",
        sortable: true,
        hideDefaultActions: true,
        
      },
      {
        label: "Channel",
        sortable: false,
        hideDefaultActions: true,
        fieldName: "",
        
        cellAttributes: {
            iconName: { fieldName: "channelIcon" },
          },

      },

      {
        fieldName: "",
        label: "Cart",
        wrapText: false,
        hideDefaultActions: true,
        cellAttributes: {
          iconName: { fieldName: "cartIcon" },
        },
      },

      {
        fieldName: "",
        label: "Follo Up",
        wrapText: false,
        hideDefaultActions: true,
        cellAttributes: {
          iconName: { fieldName: "followUpIcon" },
        },
      },


      

    {
    label: "Name",
    fieldName: "Name",
    sortable: "true",
    sortable: true,
    hideDefaultActions: true,
  }
  
];
export default class DtExample extends LightningElement {
  @track data=[];
  @track columns = columns;
  @track sortBy;
  @track sortDirection;

  @track 
  error;
  @track 
  rowLimit = 25;
  @track 
  rowOffSet = 0;

  connectedCallback() {
    this.loadData();
  }

  loadData() {
    return getCardDetsils({ limitSize: this.rowLimit, offset: this.rowOffSet })
      .then((result) => {
      
        this.data=result;

        this.data= this.data.map(resultss =>{

            let channel='';
            let followUp='';

             switch (resultss.Channel__c) {
                case "Wireless":
                    channel='utility:call';
                    break;
                case "Video":
                    channel='utility:home';
                    break;
                case "Internet":
                    channel='utility:world';
                    break;        
            }

            if(resultss.FollowUp__c){
                followUp='utility:error';
            }
           
         

            return { ...resultss, followUpIcon:followUp, cartIcon: 'utility:cart',channelIcon:channel };


        });

        alert(JSON.stringify(this.data));


        // alert(JSON.stringify(  this.data));
        


    //     this.data = updatedRecords.map(resultss =>{

    //         // switch (resultss.Channel__c) {
    //         //     case "Wireless":
    //         //         resultss.channelIcon='utility:call';
    //         //         break;
    //         //     case "Video":
    //         //         resultss.channelIcon='utility:home';
    //         //         break;
    //         //     case "Internet":
    //         //         resultss.channelIcon='utility:world';
    //         //         break;        
    //         // }

    //         resultss.channelIcon='utility:world';

    //         return resultss;

    
    //    });

        // alert(JSON.stringify( this.data));

        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
        this.data = undefined;
        alert(error);
      });
  }

  loadMoreData(event) {
    const currentRecord = this.data;
    const { target } = event;
    target.isLoading = true;

    this.rowOffSet = this.rowOffSet + this.rowLimit;
    this.loadData().then(() => {
      target.isLoading = false;
    });
  }

  handleSortAccountData(event) {
    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
    this.sortAccountData(event.detail.fieldName, event.detail.sortDirection);
  }

  renderedCallback() {
    loadStyle(this, lwcDatatableStyle)
      .then(() => {
        console.log("Loaded Successfully");
        // alert("Loaded Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("err" + error);
      });
  }

  sortAccountData(fieldname, direction) {
    console.log('sortAccountData direction '+direction);

    let parseData = JSON.parse(JSON.stringify(this.data));

    let keyValue = (a) => {
      return a[fieldname];
    };

    let isReverse = direction === "asc" ? 1 : -1;

    parseData.sort((x, y) => {
      x = keyValue(x) ? keyValue(x) : "";
      y = keyValue(y) ? keyValue(y) : "";

      return isReverse * ((x > y) - (y > x));
    });

    this.data = parseData;
  }
}
