trigger ContactTrigger on Contact (after insert) {

    List<Id> contactIds = new List<Id>();

    if(Trigger.isAfter && Trigger.isInsert)
    {

        Contact[] cons = [SELECT Id,Name FROM Contact WHERE Id IN :Trigger.new];

        for(Contact contact : cons){
            contactIds.add(contact.ID);
        }

        WhatsAppApiController.sendMessageWAFuture(contactIds);              

    }

}