import { LightningElement, track } from 'lwc';

export default class Translator extends LightningElement {

    @track
    languageOptions=[]

    fromLanugage;
    tolanguage
    languageInputed;

    convertedText
    
    @track
    convertButtnstateDisabled=true;

    connectedCallback(){

       this.getAllLanguages();
    }


    getAllLanguages() { 

        const options = {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': 'a54112b125msh950fd78fd826273p1a3c88jsne06a6c87eedc',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            }
        };
        
        fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', options)
            .then(response => {

                
                console.log('***'+response.ok);
                //console.log('***'+ response.json());

                return response.json()
            })
            .then(response => {
                // alert(JSON.stringify(response));
                //console.log(response)
                this.updateDataWithLanguageName(response);
            })
            .catch(err => {
                console.error(err)
                alert('Err'+err);
            });

    }


    handleSelection(event){

        if(event.target.dataset.id==='from'){
        this.fromLanugage = event.target.value;
       }else{
        this.tolanguage = event.target.value;
       }

      // console.log("** this.fromLanugage", this.fromLanugage)

       this.validateButtonState();


    }


    updateDataWithLanguageName(apiData){

        

        apiData=apiData.data.languages.map(data =>{

            const option = {
                label : ''+this.getLanguage(data.language),
                name: ''+this.getLanguage(data.language),
                value : data.language
            };
            this.languageOptions = [...this.languageOptions, option];

        
        })

       this.languageOptions= this.languageOptions.sort((a, b) => a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1);
        console.log('** updateDataWithLanguageName **'+JSON.stringify(this.languageOptions));



    }


    handleTextChange(event){
      //  alert('handleTextChange');
      this.languageInputed= event.target.value
      this.validateButtonState();

    }

    validateButtonState(){

        if(( this.languageInputed!=null &&  this.languageInputed.length>0) && (this.fromLanugage!=null) && (this.tolanguage!=null)){
            this.convertButtnstateDisabled=false;
        }

        console.log(" ** this.languageInputed", this.languageInputed)
        console.log("** this.fromLanugage", this.fromLanugage)

        console.log("** this.tolanguage", this.tolanguage)
    }


    getLanguage = (code) => {
        const lang = new Intl.DisplayNames(['en'], {type: 'language'});
        return lang.of(code);
    }

    convertText(){

        const encodedParams = new URLSearchParams();
        encodedParams.append("q", this.languageInputed);
        encodedParams.append("target", this.tolanguage);
        encodedParams.append("source", this.fromLanugage);

       const options = {
     	method: 'POST',
	    headers: {
	    	'content-type': 'application/x-www-form-urlencoded',
		    'Accept-Encoding': 'application/gzip',
		    'X-RapidAPI-Key': 'a54112b125msh950fd78fd826273p1a3c88jsne06a6c87eedc',
		    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	   },
	     body: encodedParams
     };

      fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
     	.then(response => {
            return  response.json()
        })
	    .then(response => {
           // alert(JSON.stringify(response)); 
            console.log(response)
            this.convertedText=response.data.translations[0].translatedText
            alert(this.convertedText);
        })
	    .catch(err => {
            alert(JSON.stringify(err)); 
            console.error(err)
        });

       }

    





}