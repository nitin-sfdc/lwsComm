public with sharing class OTPUtility {
  

    @AuraEnabled
    public static String  sendOtp(String contactId){

        String message = '';
        String OTP='';
        boolean isEmailSend=false;
        boolean isRecordInserted=false;

        try {

            Contact con=[select id,name ,Email from Contact where id=:contactId];

            if(con!=null && con.Email!=null){
             
            OTP=''+getOTP();
            
            isRecordInserted=CheckInUtility.createCheckinRecord(OTP,con);

            if(isRecordInserted){
            isEmailSend=EmailUtility.sendEmail(con.Email,''+OTP+'  Use this OTP for checkin');
            isEmailSend=true; 
            }



            if(isEmailSend){
                message= 'Email Sent to the contact '+con.Email;
            }
            }else{
                throw newMessageException('Something went wrong ');
            }

           
            
        } catch (Exception e) {
            throw newMessageException('Some thing went wrong jjj'+e.getMessage());
            // message= 'some error';
        }

        return message;
    }


   public static Integer getOTP(){
     
        return Math.round((Math.random() * (90000) + 10000));

   }

   @AuraEnabled
   public static  String validateOTP(String contactId,String otp){


    try { 

        CheckIn__c  checkinObject= [select id , name ,OTP__c from CheckIn__c where  Contact__c=:contactId order  by createdDate DESC limit 1];
            

        if(checkinObject!=null && checkinObject.OTP__c==otp){
            return 'OTP VALIDATED';
        }else {
            throw newMessageException('INVALID OTP entered ');
        }



    } catch (Exception e) {
        throw newMessageException(e.getMessage());
    }

   }


   private static AuraHandledException newMessageException(String message) {
    AuraHandledException e = new AuraHandledException(message);
    e.setMessage(message);
    return e;
}


}
