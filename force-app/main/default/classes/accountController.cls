public with sharing class accountController {
    @AuraEnabled(cacheable = true)
    public static List<Account> accountData() {
           return [select Id, Name, Phone, Rating from Account where Rating!=null limit 10 ];
    }

    @AuraEnabled
    public static void updateAccounts(List<Account> accountsToUpdate) {
        if (accountsToUpdate == null || accountsToUpdate.isEmpty()) 
        return;
        update accountsToUpdate;
    }

   

}