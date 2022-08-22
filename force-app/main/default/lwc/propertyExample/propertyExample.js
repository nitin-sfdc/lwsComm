import { api, LightningElement, track } from 'lwc';
import listAllFields2 from '@salesforce/apex/FlexiLightningTableController.listAllFields2'
import getData from '@salesforce/apex/FlexiLightningTableController.getData'

export default class PropertyExample extends LightningElement {

    @api
    objectFields;

  

    @api
    objectName;

    @api
    viewMore=false;

    @track
    fieldResponse;

    @track
    datalist

    @track
    columnList;

    @api
    rowCount;

    @api
    incrementCount;

    @track
    apexResponse=[];







    connectedCallback(){
       listAllFields2({objName:this.objectName,columnsName:this.objectFields,rowCount:this.rowCount,incrementCount:this.incrementCount,viewMore:this.viewMore}).then((response)=>{
       console.log("** ** ", JSON.stringify(response))
       this.fieldResponse = response;
       this.columnList=this.fieldResponse.fieldDetails;
       this.getDataFromApex();
       }).catch(()=>{
        alert('Err');
       })
    }

    getDataFromApex(){

        getData({ObjectName:this.objectName,ColumnNames:this.objectFields}).then((response)=>{

            var counter=1;

            response= response.map((resultss,index) =>{
                resultss.RowNumber=index+1;
                return resultss;
            });
           
            if(this.viewMore){
              this.datalist=response.slice(0,this.rowCount);
            }else{
                this.datalist=response.slice(0,response.length-1);
            }
            
            this.apexResponse=response;
            console.log(" ** apexResponse **", JSON.stringify(this.apexResponse));
            //alert('response'+ this.apexResponse.length());


        }).catch((err)=>{
            alert('response getDataFromApex'+err);
        })



    }

    handleClick(){
        this.rowCount=this.rowCount+this.incrementCount;
        this.datalist=this.apexResponse.slice(0,this.rowCount);

        if(this.rowCount>=this.apexResponse.length){
            this.viewMore=false;
        }

       

    }
    


}