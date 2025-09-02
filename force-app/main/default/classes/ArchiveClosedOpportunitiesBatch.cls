public class ArchiveClosedOpportunitiesBatch implements Database.Batchable<SObject>, Database.Stateful {

   public Database.QueryLocator start(Database.BatchableContext bc){

      return Database.getQueryLocator('Select Id,AccountId,Name,CloseDate, Amount from Opportunity where IsClosed = TRUE') ;
     
   }

   public void execute(Database.BatchableContext bc, List<Opportunity>scope){
    List<ArcheivedOpportunity__c>archeiveOpps = new List<ArcheivedOpportunity__c>();

       for(Opportunity opp: scope){
         ArcheivedOpportunity__c archive = new ArcheivedOpportunity__c();
            archive.Name = opp.Name;
            archive.Amount__c = opp.Amount;
            archive.CloseDate__c = opp.CloseDate;
            archive.Accountid__c = opp.AccountId;
            archive.OpportunityId__c = opp.Id;
            
         archeiveOpps.add(archive);

       }

           insert archeiveOpps;
           delete scope;

   }

   public void finish(Database.BatchableContext bc) {
        System.debug('Batch Completed. All closed opportunities archived.');
         Id jobId = bc.getJobId();   // Gets the Batch Job Id
          System.debug('Batch Job Id: ' + jobId);
    }

}
