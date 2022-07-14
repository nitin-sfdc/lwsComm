// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

// string tempvar = 'Enter_your_name_here';
// System.debug('Hello World!');
// System.debug('My name is ' + tempvar);


// for ( Schema.SObjectType o : Schema.getGlobalDescribe().values() )
// {
//     Schema.DescribeSObjectResult objResult = o.getDescribe();
//     system.debug( 'Sobject: ' + objResult );
//     system.debug( 'Sobject API Name: ' + objResult.getName() );
//     system.debug( 'Sobject Label Name: ' + objResult.getLabel() );   
    
// }

// Database.executeBatch(new BatchApexExample());

ExchangeController.checkPANStatus();