public with sharing class GetRecordTypeHelper {


    List<RecordType> recType = [SELECT Id, Name FROM RecordType WHERE sObjectType='Account'];

   

    @AuraEnabled(cacheable=true)
    public  static   List<RecordType> getRecordTypeObjectAccount(){

        List<RecordType> lstAccountRecordTypes = [SELECT Id, Name FROM RecordType WHERE sObjectType='Account'];

        return lstAccountRecordTypes;

    }

    @AuraEnabled(cacheable=true)
    public  static   List<Contact> getContactWithName(String sssname){

        String ser='%'+sssname+'%';

        List<Contact> lstAccountRecordTypes = [SELECT Id, Name FROM Contact where Name like :ser];

        return lstAccountRecordTypes;
    }


    @AuraEnabled(cacheable=true)
    public  static   List<Account> getAccountDetails(String searchString){

                String ser='%'+searchString+'%';


        List<Account> accountList = [SELECT Id, Name  , (select Id,Name from Contacts) FROM Account where Name like :ser];
 
        return accountList;
    }



    public  List<RecordType> getrecType(){
            recType = [SELECT Id, Name FROM RecordType WHERE sObjectType='Account'];
            return recType;
    }




}
