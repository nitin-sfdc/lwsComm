import { LightningElement, wire, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import lwcDatatableStyle from "@salesforce/resourceUrl/lwcDatatableStyle";

import getCardDetsils from "@salesforce/apex/lwcSortingDataTableCtrl.getCardDetsils";
const columns = [
      {
        label: "Name",
        fieldName: "Name",
        sortable:true
      },
     
      {
        label: "Date",
        fieldName: "CreatedDate",
        sortable: true,
        hideDefaultActions: true,
      
       
        cellAttributes: {
            alignment: 'center'
          },
        
      },
      {
        label: "Channel",
        sortable: false,
        hideDefaultActions: true,
        fieldName: "",
        
        cellAttributes: {
            iconName: { fieldName: "channelIcon" },
            alignment: 'center'
          },

      },

      {
        fieldName: "",
        label: "Cart",
        sortable: false,
        hideDefaultActions: true,
        cellAttributes: {
          iconName: { fieldName: "cartIcon" },
          alignment: 'center'
        },
      },

      {
        fieldName: "",
        label: "Follo Up",
        sortable: false,
        hideDefaultActions: true,
        cellAttributes: {
          iconName: { fieldName: "followUpIcon" },
          alignment: 'center'
        },
      },
      {
        type: "action",
        typeAttributes: {
          rowActions: [
            { label: "View", name: "view" },
            { label: "Edit", name: "edit" },
            { label: "Delete", name: "delete" },
          ],
          menuAlignment: "right",
        },
      },

   
  
];
export default class DtExample extends LightningElement {
  @track data=[];
  @track columns = columns;
  @track sortBy;
  @track sortDirection;

  @track 
  error;
  @track 
  rowLimit = 5;
  @track 
  rowOffSet = 5;

  @track
  isAllDataLoaded=false;

  connectedCallback() {
    this.loadData();
  }

  handleRefresh(event){
    eval("$A.get('e.force:refreshView').fire();");

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

        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
        this.data = undefined;
        alert(error);
      });
  }

  loadMoreData(event) {

    const { target } = event;

    if( this.isAllDataLoaded){
        target.isLoading = false;
        return ;
    }

    
   
    this.rowOffSet = this.rowOffSet + this.rowLimit;
   
    getCardDetsils({ limitSize: this.rowLimit, offset: this.rowOffSet })
      .then((result) => {

        if(result.length==0){
            this.isAllDataLoaded=true;
        }
      
        result= result.map(resultss =>{
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

        this.data =[].concat(this.data,result);
        target.isLoading = false;

        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
        this.data = undefined;
        alert(error);
        target.isLoading = false;
      });

  }

  handleSortAccountData(event) {
    console.log('handleSortAccountData direction ');

    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
    this.sortAccountData(event.detail.fieldName, event.detail.sortDirection);
  }

//   renderedCallback() {
//     // loadStyle(this, lwcDatatableStyle)
//     //   .then(() => {
//     //     console.log("Loaded Successfully");
//     //     // alert("Loaded Successfully");
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //     alert("err" + error);
//     //   });
//   }

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

    console.log(" sort data befor "+JSON.stringify(this.data));

    this.data = parseData;
    console.log(" sort data afyer "+JSON.stringify(this.data));
    
    
  }
}
