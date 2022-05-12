public with sharing class CheckInUtility {
   
    public static boolean createCheckinRecord(String otp,Contact contactObject){

            try{

            CheckIn__c checkIn= new CheckIn__c();
            checkIn.OTP__c=otp;
            checkIn.Contact__c=contactObject.ID;
            insert checkIn;  
            return true;

            }catch(Exception ex){
                System.debug(''+ex);
            }

            return false;

    }


}
