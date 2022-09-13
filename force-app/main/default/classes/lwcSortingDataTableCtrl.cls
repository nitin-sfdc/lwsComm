public with sharing class lwcSortingDataTableCtrl {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer limitSize, Integer offset){
        List<Account> accountList = [SELECT Id, Name, Phone, Industry, Description, Type, Website FROM Account
                                     ORDER BY CreatedDate
                                     LIMIT :limitSize
                                     OFFSET :offset
                                     ];
        return accountList;
    }


    @AuraEnabled(cacheable=true)
    public static List<Cart_Tracker__c> getCardDetsils(Integer limitSize, Integer offset){
        List<Cart_Tracker__c> accountList = [SELECT Id, Name ,CreatedDate ,Channel__c ,FollowUp__c FROM Cart_Tracker__c
                                     ORDER BY CreatedDate
                                     LIMIT :limitSize
                                     OFFSET: offset
                                     ];
        return accountList;
    }


}
