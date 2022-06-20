import { LightningElement,api, wire ,track} from 'lwc';
import getStudentPassedDepartmentWise from '@salesforce/apex/StudentController.getStudentPassedDepartmentWise';

export default class DisplayYearDataComponent extends LightningElement {

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

        var result = this.departmentData.filter(obj => {
           return obj.departmentId === event.currentTarget.dataset.id
        })

        deptName = result[0].departmentName;

          const selectEvent = new CustomEvent('mycustomevent', {
              detail: {
                  id: event.currentTarget.dataset.id,
                  selectedyear: this.yearSelected,
                  departmentName: deptName
              }
        });
       this.dispatchEvent(selectEvent);
        
    }

    
}