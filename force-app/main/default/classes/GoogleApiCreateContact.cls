public with sharing class GoogleApiCreateContact {

    public List<EmailAddresses> emailAddresses;
	public List<Names> names;
	public List<PhoneNumbers> phoneNumbers;


   public  GoogleApiCreateContact(){
       emailAddresses= new List<EmailAddresses>();
       names= new List<Names>();
       phoneNumbers= new List<PhoneNumbers>();
       

    }


    public class Names {
		public String givenName;

     public   Names(String mGivenName){
            this.givenName=mGivenName;
        }

	}

	

	public class EmailAddresses {
		public String value;

       public  EmailAddresses(String mValue){
            this.value=mValue;
        }

	}

    public class PhoneNumbers {
		public String value;

      public   PhoneNumbers(String mValue){
            this.value=mValue;
        }
	}

	
	public static GoogleApiCreateContact parse(String json) {
		return (GoogleApiCreateContact) System.JSON.deserialize(json, GoogleApiCreateContact.class);
	}
  
}
