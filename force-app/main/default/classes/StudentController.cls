public with sharing class StudentController {
   

    @AuraEnabled(cacheable=true)
    public static  List<DepartmentData> getStudentPassedDepartmentWise(String passingYear) {

    List<ID> departMentIdList = new List<ID>();
    List<DepartmentData> departmentDataList = new List<DepartmentData>();
    Map<Id, Integer> countMap = new Map<Id, Integer>();


    system.debug( 'unique years'+[SELECT count(Id) ,passing_year__c FROM student2__C  GROUP BY passing_year__c]);


    //  AggregateResult[] groupedResults= [SELECT count(Id) ,Department2__c FROM student2__C  where passing_year__c=:passingYear GROUP BY Department2__c];


     for (AggregateResult aggRes : [SELECT count(Id)  countofStudents , Department2__c departmentId FROM student2__C  where passing_year__c=:passingYear GROUP BY Department2__c]) {

            Id departmentId = (Id) aggRes.get('departmentId');
            departMentIdList.add(departmentId);
            countMap.put(departmentId,(Integer) aggRes.get('countofStudents'));

     }


        for(Department2__c  department : [select Name ,id  from Department2__c where id in: departmentIdList]){    
            departmentDataList.add(new DepartmentData(countMap.get(department.Id),department.name,department.Id));
        }

        system.debug( 'departmentDataList'+departmentDataList);

        return departmentDataList;
   }



   @AuraEnabled(cacheable=true)
   public static List<String> getUniqueYears(String test){
       List<String> listName = new List<String>();

       for (AggregateResult aggRes : [SELECT count(Id) ,passing_year__c passingYear FROM student2__C  GROUP BY passing_year__c]){
            listName.add((String) aggRes.get('passingYear'));
       }

       system.debug( 'listName'+listName);

       return listName;

      
   }


   @AuraEnabled(cacheable=true)
   public static List<student2__C> getStudentInfo(String passingYear,String depsrtmentId){
      
    List<student2__C> studentList = new List<student2__C>();
    studentList=[select id,name from student2__C where passing_year__c=:passingYear and Department2__c=:depsrtmentId];
    system.debug( 'studentList'+studentList);
    return studentList;


   }








    
}   



