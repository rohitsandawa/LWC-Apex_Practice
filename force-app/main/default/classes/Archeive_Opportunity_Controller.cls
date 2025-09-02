public with sharing class Archeive_Opportunity_Controller {
    
    @AuraEnabled
    public static void runArchiveBatch() {
        ArchiveClosedOpportunitiesBatch batch = new ArchiveClosedOpportunitiesBatch(); 
         Database.executeBatch(batch, 200);

    }
}