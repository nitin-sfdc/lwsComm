    public class SchedulabeExample implements Schedulable {
    
        public void execute(SchedulableContext SC) {
            System.debug('SchedulabeExample');
            Database.executeBatch(new BatchApexExample());
        }
    
    }

