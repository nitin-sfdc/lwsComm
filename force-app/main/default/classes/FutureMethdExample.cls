public with sharing class FutureMethdExample {
   

    @future
    public static void doLondCalculation() {

        for (Integer i = 0; i < 200000; i++) {
            
            for (Integer j = 0; j < 200000; j++) {
                System.debug('future '+i);
            }
        }
        
    }

    
    
    public static void simple() {

        for (Integer i = 0; i < 200000; i++) {
                System.debug('simple '+i);
            }
        
        
    }


       
  
}
