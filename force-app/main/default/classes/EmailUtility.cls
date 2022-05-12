public with sharing class EmailUtility {
   
    public static boolean sendEmail(String emailId,String emailBody){

            List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setSenderDisplayName('Salesforce');
            mail.toAddresses = new String[] {emailId};
            mail.setHtmlBody(emailBody);
            mails.add(mail);
            Messaging.SendEmailResult[] results = Messaging.sendEmail(mails);

            if(results!=null && results[0].success) {
                return true;
            }

            return false;

    }


}
