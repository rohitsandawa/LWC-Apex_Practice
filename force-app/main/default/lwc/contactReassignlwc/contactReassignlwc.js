import { LightningElement, api} from 'lwc';
import runqueuable from '@salesforce/apex/Contact_ReassignController.runqueuable';

export default class ContactReassignlwc extends LightningElement {

    @api recordId; // Account Id
    newOwnerId;

    handleOwnerChange(event) {
        this.newOwnerId = event.detail.value;
    }

    handleReassign() {
        runqueuable({ accId: this.recordId, ownerId: this.newOwnerId })
            .then(() => {
                alert('Reassignment started in background.');

            })
            .catch(error => {
                console.error('Error:', error.body.message);
            })
    }




}