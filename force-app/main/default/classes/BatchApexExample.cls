

public class BatchApexExample implements Database.Batchable<sObject> {

    public BatchApexExample() {
    }

    public Database.QueryLocator start(Database.BatchableContext BC) {

        String query ='Select Id,Name from Account';
        return Database.getQueryLocator(query);

    }

    public void execute(Database.BatchableContext BC, List<Account> scope) {

        List<Account> accountToBeUpdated = new List<Account>();

    for (Account objectOfAccount : scope) {
        objectOfAccount.Name = 'Mttt'+objectOfAccount.Name;
        accountToBeUpdated.add(objectOfAccount);
    }

    update accountToBeUpdated;


    }

    public void finish(Database.BatchableContext BC) {
    }

}

