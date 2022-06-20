public with sharing class DepartmentData {
  
     @AuraEnabled
     public Integer numberOfStudents;
     @AuraEnabled
     public  String departmentName;
     @AuraEnabled
     public ID departmentId;

    public  DepartmentData(Integer mnmberOfStudents,String mdepartmentName,ID mDepartmentId) {
        this.numberOfStudents = mnmberOfStudents;
        this.departmentName = mdepartmentName;
        this.departmentId = mDepartmentId;
    }



}
