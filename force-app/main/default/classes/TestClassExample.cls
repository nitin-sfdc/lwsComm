
@isTest
public with sharing class TestClassExample {


     @TestSetup
     static void makeData(){
          
          for (Integer i = 0; i<10;i++){
               System.debug('Creating Account'+i);
               Account account = new Account();
               account.name='Test Account'+i;
               insert account;
          }
     }


    @isTest
    static void method1(){

     string serarch='%Test%';

         List<Account> listName = new List<Account>(); 
         listName=[select Id,Name from Account where name like :serarch];
         System.assertEquals(listName.size(),10);
        
    }

    @isTest
    static void method2(){

         System.assertEquals(1,1);
        
    }


   
}
