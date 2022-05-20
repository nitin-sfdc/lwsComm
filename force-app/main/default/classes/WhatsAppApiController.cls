public with sharing class WhatsAppApiController {


    @future(callout=true)
    public static void sendMessageWAFuture(List<ID> recordIds) {

        for(ID contact : recordIds){
          sendMessageWA('');
        }
        
    }



   

       @AuraEnabled
       public static void  sendMessageWA(String mobNumber){
        try {

           Http h = new Http();
 
           HttpRequest req = new HttpRequest();
           req.setEndpoint('https://graph.facebook.com/v13.0/114556351256883/messages');
           req.setHeader('Content-Type', 'application/json');
           req.setMethod('POST');


        String boundary = '----------------------------' + String.valueOf(DateTime.now().getTime());
        String body = '--' + boundary + '\r\n';
        
        body += 'Content-Disposition: form-data; name="messaging_product"\r\n\n';
        body += 'whatsapp\r\n';
        body += '--' + boundary + '\r\n';
        
        body += 'Content-Disposition: form-data; name="to"\r\n\n';
        body += '919096213138\r\n';
        body += '--' + boundary + '\r\n';
        
        body += 'Content-Disposition: form-data; name="type"\r\n\n';
        body +=  'template\r\n';
        body += '--' + boundary + '\r\n';

        body += 'Content-Disposition: form-data; name="template"\r\n\n';
        body += (new Template()).getJson() + '\r\n';
        body += '--' + boundary + '--';

        req.setBody(body);

        System.debug('createJobAppJSONString *** '+(new Template()).getJson());
 
        
        String apiKEY=System.Label.WAAPITOEKN;

        req.setHeader('Authorization', 'Bearer '+apiKEY);
        req.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
        req.setHeader('Content-Length', String.valueof(body.length()));
       

    //req.setBodyAsBlob(formBlob);
 
    // Send the request, and return a response
    HttpResponse res = h.send(req);

    System.debug(''+res.getBody());

          
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


   


    public class Template{

	// public String name='hello_world';
    public String name='test_template';
    
	public Language language= new Language();

	
    public String  getJson() {
       String str = JSON.serialize(this);
       return str;
    }
}

  public class Language {
		public String code='en_US';
	}
    


}
