public with sharing class AccountCreateUtility {
   
    @AuraEnabled
    public static Account create(Account acc){
        try {

            insert acc;
            return acc;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


}
