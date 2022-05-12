public with sharing class CallFromCustomeButton {

    
   

    public static boolean method(String name){


        return true;
        
    }

    
    


    @AuraEnabled
    public static List<CallFromCustomeButton.ModelSaver> getAvailableObjects(String name){
        List<CallFromCustomeButton.ModelSaver> listObject = new List<CallFromCustomeButton.ModelSaver>();
        Integer  counter=0;
            
          for ( Schema.SObjectType o : Schema.getGlobalDescribe().values() )
                {
                    Schema.DescribeSObjectResult objResult = o.getDescribe();
                    
                    List<String> keys = new List<String>();
                        for(Schema.FieldSet sd:objResult.fieldSets.getMap().values()){

                            for(Schema.FieldSetMember fieldSetMemberObj : sd.getFields()){

                               keys.add(fieldSetMemberObj.getLabel());


                            }

                            
                            
                        }

                    // system.debug( 'Sobject: ' + objResult );
                    // system.debug( 'Sobject API Name: ' + objResult.getName() );
                    system.debug( 'keys: ' + keys );   

                listObject.add(new CallFromCustomeButton.ModelSaver(objResult.getName(),++counter,keys));

    
                }

               return listObject;

    

}

public class ModelSaver{

    @AuraEnabled
    public String named {get;set;} 
    @AuraEnabled
    public  Integer numbers {get;set;}

    @AuraEnabled
    public   List<String>  fieldValues  {get;set;}



public ModelSaver(){

}
    public ModelSaver(String namee,Integer numbere, List<String>  mFieldValues){

       named=namee;
       numbers=numbere;
       fieldValues=mFieldValues;
       
    }


}

}
