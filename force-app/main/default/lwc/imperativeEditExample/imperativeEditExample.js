import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/ImperativeAccountController.getAccounts';
import updateAccounts from '@salesforce/apex/ImperativeAccountController.updateAccounts';

export default class ImperativeEditExample extends LightningElement {
    @track accounts = [];
    error;


    connectedCallback() {
        this.loadAccount();
    }

    loadAccount() {
        getAccounts()
            .then(data => {
                this.accounts = data;
                this.error = undefined;
            })

            .catch(error => {
                this.error = error;
                this.accounts = [];

            })

    }

    handlePhoneChange(event) {
        const recordId = event.target.dataset.id;
        const newPhone = event.target.value;

        this.accounts = this.accounts.map(accs => {
            if (accs.Id === recordId) {
                return { ...accs, Phone: newPhone };
            }
            return accs;
        })

    }

    handleSave(event) {
        const recordids = event.target.dataset.id
        const record = this.accounts.find(acci => acci.Id === recordids)
        console.log('Sending record to Apex:', JSON.stringify(record));
        // acc parameter should match with apex parameter of updateAccounts method
        updateAccounts({ acc: record })
            .then(() => {
                alert('phone updated successfully');
            })

            .catch(error => {
                this.error = error;
                alert('Error updating account: ' + error.body.message);
            });

    }

}