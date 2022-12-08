public with sharing class ContactUtility {


    @AuraEnabled(Cacheable = true)
    public static List<Contact> getAccountRelatedContact(String accountRecordId) {
        List<Contact> contacts = new List<Contact>();
        contacts=[select id,name,FirstName,lastName ,email from Contact where  accountId=:accountRecordId];
        return contacts;
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
