public with sharing class GoogleContactController {

   
    @future(callout=true)
    public  static void  sendContactData(List<Id> id,String mApiKey){


        System.debug('sendContactData mApiKey'+mApiKey );

       List<Contact> contactList=[SELECT Id,LastName,Phone,Email FROM Contact WHERE Id IN :id];

        System.debug('contactList.size()'+contactList.size() );
        
        if(contactList!=null && contactList.size()>0){

            for(Contact contactObj : contactList){
            system.debug(' *** email '+contactObj.Email);
            system.debug(' *** Name '+contactObj.LastName);
            system.debug(' *** Phone '+contactObj.Phone);
            sendRequestToGoogleAPI(contactObj.Email,contactObj.LastName,contactObj.Phone,mApiKey);
            }
            //sendRequestToGoogleAPI('email','Name','Name',mApiKey);
           }

    }


    

        public  static void  sendRequestToGoogleAPI(String email ,String userName,String phoneNumbers,String mApiKey){
            
            system.debug('GoogleContactController');
            GoogleApiCreateContact afterss= new GoogleApiCreateContact();
            afterss.emailAddresses.add(new GoogleApiCreateContact.EmailAddresses(email));
            afterss.names.add(new GoogleApiCreateContact.Names(userName));
            afterss.phoneNumbers.add(new GoogleApiCreateContact.PhoneNumbers(phoneNumbers));
            system.debug('GoogleApiCreateContact'+JSON.serialize(afterss));


            Http httpObject = new Http();
            HttpRequest request = new HttpRequest();
            request.setHeader('Authorization', 'Bearer '+mApiKey);
            request.setHeader('Content-Type', 'application/json');
            request.setHeader('Accept', 'application/json');

            request.setBody(JSON.serialize(afterss));
            
            request.setEndpoint('https://people.googleapis.com/v1/people:createContact');
            request.setMethod('POST');
            HttpResponse response = httpObject.send(request);
            String responseBody = response.getBody();

            system.debug( 'responseBody'+responseBody);

        }
    
   


}
