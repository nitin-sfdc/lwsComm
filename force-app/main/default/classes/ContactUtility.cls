public with sharing class ContactUtility {

    @AuraEnabled
       public static Integer TotalRecords(String accountRecordId){
           return [Select count() from Contact where  accountId=:accountRecordId];
       }


    @AuraEnabled(Cacheable = true)
    public static List<Contact> getAccountRelatedContact(String accountRecordId,Integer v_Offset, Integer v_pagesize) {
        List<Contact> contacts = new List<Contact>();
        contacts=[select id,name,FirstName,lastName ,email from Contact where  accountId=:accountRecordId limit :v_pagesize OFFSET :v_Offset];
        return contacts;
     }


     @AuraEnabled(cacheable=true)
     public static Integer getNext(Integer v_Offset, Integer v_pagesize){
         v_Offset += v_pagesize;
         return v_Offset;
     }

     @AuraEnabled(cacheable=true)
     public static Integer getPrevious(Integer v_Offset, Integer v_pagesize){
         v_Offset -= v_pagesize;
         return v_Offset;
     }


     @AuraEnabled(Cacheable = true)
    public static List<Contact> getContacts() {
        return [SELECT Id, Name, FirstName, LastName, Phone, Email 
                FROM Contact 
                WHERE Email != null
                AND Phone != null
                ORDER BY CreatedDate limit 20];
    }
}
