public with sharing class ContactController {

    @AuraEnabled
    public static Contact getContactInfo(String contactId){
        Contact contact;
        try {

           contact =[select id,name,MobilePhone from contact where id =:contactId];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return contact;
    }
}
