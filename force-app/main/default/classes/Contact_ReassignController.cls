public with sharing class Contact_ReassignController {
    @AuraEnabled
    public static void runqueuable(Id accId, Id ownerId) {
        System.enqueueJob(new ContactReassignQueueable(accId, ownerId));
      
    }
}