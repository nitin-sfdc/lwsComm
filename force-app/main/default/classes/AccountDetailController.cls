public with sharing class AccountDetailController {
   

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInfo(){

        List<Account> result = new List<Account>();
        result=[select id,name from Account];
        return result;




        
    }




}
