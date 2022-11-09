



@RestResource(urlMapping='/webhook/')
global without sharing class UPIPayment {

    @HttpDelete
    global static void doDelete() {
       
    }
  
    @HttpGet
    global static void  doGet() {
       
     
    }
  
    @HttpPost
    global static void  doPost() {
       try{
         String fieldName;
         String fieldValue;

         String requestBody='';


        
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;

        requestBody=req.requestBody.toString();
        JSONParser parser= JSON.createParser(requestBody);

        PaymentCallback l = PaymentCallback.parse(requestBody);

        if(l.event=='order.paid'){ 
        String paymentId=l.payload.order.entity.receipt;

        Payment__c ddd= new Payment__c();
        ddd.Id=paymentId;
        ddd.CallbackString__c=requestBody;
        ddd.Status__c='Success';
        update ddd;
        }



        // while (parser.nextToken()!=null) {

        //     if(parser.getCurrentToken()!=JSONToken.END_OBJECT){

        //         fieldName=parser.getCurrentName();
        //         fieldValue=parser.getText();

        //         if(fieldName=='event' && fieldValue=='order.paid'){
        //          PaymentCallback l = PaymentCallback.parse(requestBody);

        //          if(l.event=='order.paid'){ 
        //          String paymentId=l.payload.order.entity.receipt;

        //          Payment__c ddd= new Payment__c();
        //          ddd.Id=paymentId;
        //          ddd.Status__c='Success';
        //          update ddd;

               
                 
        //         //List<Payment__c> listPayment=[SELECT Id,name ,amount__c FROM Payment__c];
        //          System.debug('* listPayment *'+JSON.serialize(ddd));
        //          System.debug('* paymentId *'+paymentId);




        //         // //updatePayment(paymentId);
              
        //         // AutoLaunchedFlowExample__c	sss= new  AutoLaunchedFlowExample__c();
        //         // sss.TestText__c=' $$$$$$$';
        //         // sss.reachArea__c='payment ' +paymentId+' serialise '+JSON.serialize(ddd);
        //         // insert sss;
                
        //     }

        //         }
                
        //     }
            
        // }


       }catch(Exception ew){

        System.debug('* paymentId *'+ew.getMessage());

       }
    }

    // @future
    // public static void updatePayment(String paymentId) {
    //     try{

    //         Payment__c payment= [select id,name from Payment__c where id=: paymentId];

    //         AutoLaunchedFlowExample__c	sss= new  AutoLaunchedFlowExample__c();
    //         sss.TestText__c=' @@@@@@@@@@@';
    //         sss.reachArea__c='payment ' +paymentId+JSON.serialize(payment);
    //         insert sss;
         
    //     }catch(Exception e){
    //         System.debug(' *** updatePayment'+e.getMessage());

    //     }
    // }

       

}

