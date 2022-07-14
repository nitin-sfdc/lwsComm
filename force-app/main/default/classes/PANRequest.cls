public with sharing class PANRequest {

        public String task_id;
        public String group_id;	
        public PANData data;

        public PANRequest(String task_id, String group_id, String panNumber){
            this.task_id = task_id;
            this.group_id = group_id;
            this.data = new PANData(panNumber);
        }



        class PANData {
            public String id_number;	
            public PANData(String id_number){
                this.id_number = id_number;
            }
        }
   
}
