public with sharing class ApexTriggerHandler {

    public  static void handleBeforeInsert(List<Account> saccountList) {

        for (Account variable : saccountList) {

           if(variable.BillingStreet!=null) {
               variable.ShippingStreet = variable.BillingStreet;
           }

           if(variable.BillingCity!=null) {
            variable.shippingCity = variable.BillingCity;
           }

           if(variable.BillingCountry!=null) {
            variable.ShippingCountry = variable.BillingCountry;
           }

            if(variable.billingPostalCode!=null) {
            variable.shippingPostalCode = variable.billingPostalCode;
           }

        }

    }

     public  static void handleAfterInsert(List<Account> saccountList) {

        Set<Id> accountIdSet = new Set<Id>();

        DateTime days30=System.now()-30;

        List<Opportunity> sss= new List<Opportunity>();
        List<Opportunity> OpportunityListTobeUpdated= new List<Opportunity>();
        

        for(Account account : saccountList) {
            accountIdSet.add(account.Id);
         }

         sss=[select id,stageName,AccountId , createdDate,CloseDate from Opportunity where AccountId in : accountIdSet];


         if(sss.size() > 0) {

             for(Opportunity variable: sss){

                if(variable.createdDate<days30 && variable.stageName=='Closed Won'){

                    variable.stageName = 'Closed Won';
                    variable.CloseDate=System.today();

                    OpportunityListTobeUpdated.add(variable);
                }
             }
         }

        }

      public  static void sendEmailAfterAccountInsert(List<Account> Account) {


        User user = [select id,profile.name ,email from user where profile.name = 'System Administrator'];

        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();


        for (Account variable : Account) {
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setSenderDisplayName('Salesforce');
            mail.toAddresses = new String[] {user.email};
            mail.setHtmlBody('Hi New Account created ');
            mails.add(mail);
        }

Messaging.SendEmailResult[] results = Messaging.sendEmail(mails);
//we are checking if the mails are sent or not.
if (results[0].success)
{
System.debug('The email was sent successfully.');
} else {
System.debug('The email failed to send: '+ results[0].errors[0].message);
}

     }
}
