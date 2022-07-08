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

}