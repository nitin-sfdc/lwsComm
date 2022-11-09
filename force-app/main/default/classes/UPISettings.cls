public with sharing class UPISettings {

   @AuraEnabled 
   public  String upiId{get;set;}
   @AuraEnabled
   public  String bankAccountNumber{get;set;}
   @AuraEnabled
   public  String ifscCode{get;set;}
   @AuraEnabled
   public  String selerGstin{get;set;}
   
}
