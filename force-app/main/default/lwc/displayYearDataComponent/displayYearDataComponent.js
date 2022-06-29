import { LightningElement,api, wire ,track} from 'lwc';
import getStudentPassedDepartmentWise from '@salesforce/apex/StudentController.getStudentPassedDepartmentWise';

export default class DisplayYearDataComponent extends LightningElement {

    // @AuraEnabled
    // public Integer numberOfStudents;
    // @AuraEnabled
    // public  String departmentName;
    // @AuraEnabled
    // public ID departmentId;

    employeeColumns = [
       
        { label: 'Department Id', fieldName: 'numberOfStudents' },
        { label: 'Department Name', fieldName: 'departmentName' },
        { label: 'Department Id', fieldName: 'departmentId' },
        {
            type:"button",
            fixedWidth: 150,
            typeAttributes: {
                label: 'Details',
                name: 'edit',
                variant: 'brand'
            }
        }
    ];


    @api
    yearSelected = '';

    @track
    departmentData;    

    @wire(getStudentPassedDepartmentWise, { passingYear: '$yearSelected' })
    getDataForSelectedYear({ error, data }) { 

        if (data && data.length > 0) {
            this.departmentData = data;
            //alert('data json '+JSON.stringify(data));
        } else if (error) {
            alert('error wire '+JSON.stringify(error));
        }

    }

    handleDisplayClick(event) {
        var deptName = '';
        
       
        // alert('' + event.currentTarget.dataset.id);

        // alert(event.detail.row.departmentId);
        // // JSON.stringify(event.detail.row)
        // alert(JSON.stringify(event.detail.row));

        var result = this.departmentData.filter(obj => {
           return obj.departmentId === event.detail.row.departmentId
        })

        deptName = result[0].departmentName;

          const selectEvent = new CustomEvent('mycustomevent', {
              detail: {
                  id: event.detail.row.departmentId,
                  selectedyear: this.yearSelected,
                  departmentName: deptName
              }
        });
       this.dispatchEvent(selectEvent);
        
    }

    
}