public with sharing class DuplicateContact {
    @AuraEnabled
    public static string  getContacts(String LastName, String Phone, String Email) {

          if(String.isBlank(Email) || String.isBlank(LastName) || String.isBlank(Phone)) {
            return 'Please enter mandatory fields (LastName, Phone and Email)';
        }
        
        List<contact> conList = [Select Id, LastName, Phone, Email from contact where Email =: Email Limit 1] ;
        if(conList.isEmpty()){
            Contact con = new Contact(
                LastName = LastName,
                Phone = Phone,
                Email = Email
                );
            
            
            insert con;
            return 'Contact is successfully created';
        }
        
        else {
            return 'This Contact have already existed in your org';
        }
        
    }
    
}