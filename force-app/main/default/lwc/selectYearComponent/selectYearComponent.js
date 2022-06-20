import { LightningElement, track,wire } from 'lwc';
import getUniqueYears from '@salesforce/apex/StudentController.getUniqueYears';
import getStudentInfo from '@salesforce/apex/StudentController.getStudentInfo';





export default class SelectYearComponent extends LightningElement {

    picklistOptions = [];
    selectedYear = '';
    studentData; 

    cardTitle = '';


  
    
     @wire(getUniqueYears, {test:'jj'})
     getPicklistValues({ error, data }) {
         if (data) {           
            this.picklistOptions = data.map( objPL => {
                return {
                    label: `${objPL}`,
                    value: `${objPL}`
                };
            });
           
         } else if (error) {
             alert('error wire '+JSON.stringify(error));
            // Handle error
            console.log('==============Error  ' + error);
            console.log(error);
        }
    }

    handleYearSelected(event) { 
        this.selectedYear = event.target.value;
        this.studentData = null;
    }

    handleDepartmentClicked(event) {
        
        // alert('handleDepartmentClicked' + event.detail.id);
        // alert('handleDepartmentClicked' + event.detail.selectedyear);

        this.cardTitle = 'Student who passed in ' + event.detail.selectedyear + ' in ' + event.detail.departmentName + ' Department' ;

        getStudentInfo({ passingYear: this.selectedYear, depsrtmentId: event.detail.id }).then(result => {
            // alert('result ' + JSON.stringify(result));
            this.studentData = result;


        }).catch(error => { 
            alert('error ' + JSON.stringify(error));
        })
        

    }

 
}