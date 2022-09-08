import { LightningElement, track } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import lwcDatatableStyle from '@salesforce/resourceUrl/lwcDatatableStyle'



export default class TestDatatableExample extends LightningElement {

     actions = [
        { label: 'View', name: 'view' },
        { label: 'Edit', name: 'edit' },
        { label: 'Delete', name: 'delete' }
     ];

    @track
     columns = [
        { label: 'Date', fieldName: 'leadDate', type:'text',wrapText: false, sortable: "true"  ,   hideDefaultActions: true},

            { 
            initialWidth: 50,
            fieldName: "",
            label: "Channel",
            initialWidth: 34,
            wrapText: true, hideDefaultActions: true,
            cellAttributes: {
            iconName: { fieldName: "selectedIcon"}
            }
               
            },

               { 
                initialWidth: 50,
                fieldName: "",
                label: "Cart",
                wrapText: false, hideDefaultActions: true,
                cellAttributes: {
                iconName: { fieldName: "cartIcon"}
                }
                   
                },    

        { label: 'Product', fieldName: 'productType', type: 'text' ,wrapText: false, hideDefaultActions: true},
 
        { 
            initialWidth: 50,
            fieldName: "",
            label: "Follo Up",
            wrapText: false, hideDefaultActions: true,
            cellAttributes: {
            class:{fieldName:'amountColor'},
            iconName: { fieldName: "followUpIcon"}
            }
               
            },

            {
                type: 'action',
                typeAttributes: {
                    rowActions:  [
                        { label: 'View', name: 'view' },
                        { label: 'Edit', name: 'edit' },
                        { label: 'Delete', name: 'delete' }
                     ],
                    menuAlignment: 'right'
                }
            }
       

    ];

    @track
    datatableData=[
         {
            id:1,
            leadDate:'15/02/1990',
            leadChannel:'Phone',
            productType:'Wireless',
            folloUpStatus:true,
            selectedIcon: "utility:call",
            cartIcon:"utility:cart",
            followUpIcon:"utility:error"
            
         },
         {  id:2,
            leadDate:'1/04/1990',
            leadChannel:'Web',
            productType:'Internet',
            folloUpStatus:true,
            selectedIcon: "utility:world",
            followUpIcon:"utility:error"

         },
         {
            id:3,
            leadDate:'5/02/2020',
            leadChannel:'Home',
            productType:'Video',
            folloUpStatus:true,
            selectedIcon: "utility:home" ,
            amountColor:'slds-text-color_success'


        },{
            id:4,
            leadDate:'15/02/2022',
            leadChannel:'Phone',
            productType:'Wireless',
            folloUpStatus:true,
            selectedIcon: "utility:call",
            cartIcon:"utility:cart"

           
        },
        {
            id:5,
            leadDate:'25/01/2006',
            leadChannel:'Web',
            productType:'',
            folloUpStatus:true,
            selectedIcon: "utility:world",
            cartIcon:"utility:cart",
            followUpIcon:"utility:error"

        },{
            id:6,
            leadDate:'15/02/1999',
            leadChannel:'Home',
            productType:'Video',
            folloUpStatus:true,
            selectedIcon: "utility:home"
           
        },
        ,{
            id:7,
            leadDate:'9/08/1995',
            leadChannel:'Phone',
            productType:'Internet',
            folloUpStatus:true,
            selectedIcon: "utility:call"

           
        },
        ,{
            id:8,
            leadDate:'6/02/1996',
            leadChannel:'Web',
            productType:'Video',
            folloUpStatus:true,
            selectedIcon: "utility:world"
           
        },{
            id:9,
            leadDate:'15/02/207',
            leadChannel:'Home',
            productType:'Wireless',
            folloUpStatus:true,
            selectedIcon: "utility:home",
            followUpIcon:"utility:error"
           
        }
    ]

    renderedCallback(){ 
       
 
        loadStyle(this, lwcDatatableStyle).then(()=>{
            console.log("Loaded Successfully")
            alert("Loaded Successfully");
        }).catch(error=>{ 
            console.log(error);
            alert("err"+error);
        });
    }


}