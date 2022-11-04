// https://global26-dev-ed.my.salesforce-sites.com/services/apexrest/webhook/
@RestResource(urlMapping='/webhook/')
global with sharing class UPIPayment {

    @HttpDelete
    global static void doDelete() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
        Account account = [SELECT Id FROM Account WHERE Id = :accountId];
        delete account;
    }
  
    @HttpGet
    global static String doGet() {
       
       return 'hiii';
    }
  
  @HttpPost
    global static void  doPost() {
       try{

        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;

       }catch(Exception ew){

       }
    }
}