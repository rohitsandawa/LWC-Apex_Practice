import { LightningElement } from 'lwc';
import getContacts from '@salesforce/apex/DuplicateContact.getContacts' ;

export default class CheckDuplicateContact extends LightningElement {
   lastname=''
   phone=''
   email=''
   message=''

 handleChange(event){
    const field = event.target.dataset.field;
    if(field === 'lastname'){
      this.lastname = event.target.value
    }   else if (field === 'phone') {
            this.phone = event.target.value;
      } else if (field === 'email') {
            this.email = event.target.value;
        }


 }

    createcontact() {
           getContacts({LastName: this.lastname, Phone: this.phone, Email:this.email})
           .then(result=>{
              this.message = result;
             
              this.lastname=''
              this.phone=''
              this.email=''
      
           })
            .catch(error => {
                this.message = 'Error: ' + error.body.message;
            });

    }
  
  handleSaveButton(){
    this.createcontact();

  }

}