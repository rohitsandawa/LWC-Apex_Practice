public with sharing class ImperativeAccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<account> getAccounts() {
       return [Select id, Name, Phone from Account Limit 5];
        
    }
    
     @AuraEnabled
     public static void updateAccounts(Account acc){
        update acc;
     }

}