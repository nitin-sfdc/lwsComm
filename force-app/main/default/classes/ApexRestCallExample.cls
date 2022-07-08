
@RestResource(urlMapping='/Account/*')
global with sharing class ApexRestCallExample {

    @HttpGet
    global static String getAccountInfo(){

        Map<String,String> request=RestContext.request.params;

        String accountID= request.get('Id');
        String name= request.get('name');

        Account accountInfo=[select Id,Name from Account where Id=:accountID];

        return name+Json.serialize(accountInfo);

    }

        @HttpPost
        global static String createAccountObjects(){

        ApexPostRequest postRequest;
        String responseMessage;
        boolean isSuccess;
        String responseRequest;
        
        
        String request=RestContext.request.requestBody.toString();

        

        if(request==null){
            responseMessage='Bad Request';
            isSuccess=false;
        }else{
        //  postRequest=(ApexPostRequest)Json.deserialize(request,ApexPostRequest.class);

        Lead sss =(Lead)Json.deserialize(request,Lead.class);

       dddd= Database.upsert(sss,false);

       if(sss.getRe==tr)

       




         Account acc= new Account();
         acc.Name=postRequest.userName;
         insert acc;
         responseMessage='Record Created ';
         isSuccess=true;
        }

         ApexPostResponse resposeBody= new ApexPostResponse();
         resposeBody.responseMessage=responseMessage;
         resposeBody.isSuccess=isSuccess;
         
         responseRequest=Json.serialize(resposeBody);
        
        return RestContext.request.params.get('Id')+responseRequest;
    }
  
}
