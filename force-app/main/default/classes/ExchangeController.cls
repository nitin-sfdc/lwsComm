public with sharing class ExchangeController {
    public ExchangeController() {

    }

    @AuraEnabled
    public static String  getAvailableSymbols(){
        try {
            Http httpObject = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://api.apilayer.com/exchangerates_data/symbols');
            request.setMethod('GET');
            request.setHeader('apikey', 'ewfaPtiJWS85iwwxtlKIyBTf2Iv7cfrp');

            HttpResponse response = httpObject.send(request);
            String responseBody = response.getBody();
            system.debug( 'Response body: ' + responseBody);

            if(response.getStatusCode() == 200) {
                return responseBody;
            }else {
                return null;
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }

    
    @AuraEnabled
    public static String  convert(string fromCountry,String toCountry,String amount ) {
        try {
            Http httpObject = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://api.apilayer.com/exchangerates_data/convert?to='+toCountry+'&from='+fromCountry+'&amount='+amount);
            request.setMethod('GET');
            request.setHeader('apikey', 'ewfaPtiJWS85iwwxtlKIyBTf2Iv7cfrp');

            HttpResponse response = httpObject.send(request);
            String responseBody = response.getBody();
            system.debug( 'Response body: ' + responseBody);

            if(response.getStatusCode() == 200) {
                return responseBody;
            }else {
                return response.getStatusCode()+responseBody;
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }

     @AuraEnabled
    public static String  checkPANStatus(String panNumber ) {
        try {
            Http httpObject = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan');
            request.setMethod('POST');
            request.setHeader('X-RapidAPI-Host', 'pan-card-verification1.p.rapidapi.com');
            request.setHeader('X-RapidAPI-Key', System.Label.RAPID_API_HOST_KEY);


            //
            
            request.setHeader('Content-Type', 'application/json;charset=UTF-8');

            PANRequest sss= new PANRequest('74f4c926-250c-43ca-9c53-453e87ceacd1','8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e',panNumber);

            request.setBody(JSON.serialize(sss));


            HttpResponse response = httpObject.send(request);
            String responseBody = response.getBody();
            system.debug( 'Response body: ' + responseBody);
            return responseBody;

            // if(response.getStatusCode() == 200) {
            //     return responseBody;
            // }else {
            //     return response.getStatusCode()+responseBody;
            // }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static String  convertToBASE64(String ss ) {

       // Blob payloadBlob = EncodingUtil.base64Decode(ss);
        //String payload = payloadBlob.toString();


        String result = EncodingUtil.Base64Encode( Blob.valueOf( ss ) );


        return result;

    }






}
