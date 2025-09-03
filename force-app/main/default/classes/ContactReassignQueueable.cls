public class ContactReassignQueueable implements Queueable {
   // Account record page and want to reassign all related Contacts to a new Owner.
    private Id accountId;
    private Id newOwnerId;

       // Constructor
    public ContactReassignQueueable(Id accId, Id ownerId) {
        this.accountId = accId;
        this.newOwnerId = ownerId;
    }


// used contructor because execute doesn't take parameter
   public void execute(QueueableContext context){
        List<Contact> contacts = [SELECT Id, OwnerId FROM Contact WHERE AccountId = :accountId];

            for (Contact c : contacts) {
                c.OwnerId = newOwnerId;
            }

            if (!contacts.isEmpty()) {
                update contacts;
            }
        Id jobId = context.getJobId();
        System.debug('Current Queueable Job Id: ' + jobId);

   }


}
