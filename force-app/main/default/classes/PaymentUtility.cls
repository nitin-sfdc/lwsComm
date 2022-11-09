public with sharing class PaymentUtility {


       @AuraEnabled
       public static Payment__c  createPaymentRequest(Double amount,Id contactId){

        Payment__c payment= new  Payment__c();
        payment.Amount__c=amount;
        payment.Status__c='Created';
        payment.Customer__c=contactId;
        insert payment;
        return  payment ;
       }
   

       @AuraEnabled
       public static string  senPaymentLink(string requestString){
        try {

           Http h = new Http();
           HttpRequest req = new HttpRequest();
           req.setEndpoint('https://api.razorpay.com/v1/payment_links/');
           req.setHeader('Content-Type', 'application/json');
           req.setHeader('Authorization', 'Basic '+System.Label.TestAPIKey);
           req.setMethod('POST');


           String body =requestString;
           req.setBody(body);
           HttpResponse res = h.send(req);
           System.debug('*****************'+res.getBody());
           return body+' ******  \n'+res.getBody();
    
        }catch(Exception ew){
            System.debug('EXEPTION '+ew);
            return ew.getMessage();
        }
}


@AuraEnabled
public static Payment__c  getPaymentDetsils(Id referenceId){
    Payment__c  payment  =[SELECT Id, Amount__c,Customer__r.Name ,Customer__r.email , Customer__r.phone FROM Payment__c WHERE  Id =:referenceId];
    return  payment ;
}




@AuraEnabled
public static  String getStringBody() {
  
    String json=		'{'+
		'  "amount": "90909000",'+
		'  "currency": "INR",'+
		'  "accept_partial": true,'+
		'  "first_min_partial_amount": 100,'+
		'  "expire_by": 1691097057,'+
		'  "reference_id": "fsksfhksfhsk",'+
		'  "description": "Payment for policy no #23456",'+
		'  "customer": {'+
		'    "name": "Gaurav Kumar",'+
		'    "contact": "+9190963138",'+
		'    "email": "nitin.zdesfdc@gmail.com"'+
		'  },'+
		'  "notify": {'+
		'    "sms": true,'+
		'    "email": true'+
		'  },'+
		'  "reminder_enable": true,'+
		'  "notes": {'+
		'    "policy_name": "Jeevan Bima"'+
		'  },'+
		'  "callback_url": "https://example-callback-url.com/",'+
		'  "callback_method": "get"'+
		'}';

    return json;
}



}