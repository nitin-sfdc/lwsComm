trigger AccountTriggerClass on Account (before insert,after insert) {

    if(Trigger.isBefore && Trigger.isInsert ){
            ApexTriggerHandler.handleBeforeInsert(Trigger.new);
    }

    if(Trigger.isafter && Trigger.isInsert){
        // ApexTriggerHandler.handleAfterInsert(Trigger.new);
       ApexTriggerHandler.sendEmailAfterAccountInsert(Trigger.new);
    }

}