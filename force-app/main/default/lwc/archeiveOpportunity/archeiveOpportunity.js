import { LightningElement } from 'lwc';
import runArchiveBatch from '@salesforce/apex/Archeive_Opportunity_Controller.runArchiveBatch';

export default class ArcheiveOpportunity extends LightningElement {
  handleArchive() {
    runArchiveBatch()
      .then(() => {
        alert('Archive Batch Started Successfully!');
      })

      .catch(error => {
        alert('Error: ' + error.body.message);
      });

  }
}