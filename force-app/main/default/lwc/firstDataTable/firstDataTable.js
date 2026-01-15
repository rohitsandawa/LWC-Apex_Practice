import { LightningElement ,wire} from 'lwc';
import accountData from '@salesforce/apex/accountController.accountData'
import updateAccounts from '@salesforce/apex/accountController.updateAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
    {   label: 'Account Name',
        fieldName: 'accountUrl',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'Name' },
            target: '_blank'
        } },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Rating', fieldName: 'Rating', editable: true, sortable: true, cellAttributes: {class: { fieldName: 'ratingClass' }
} }
];


export default class FirstDataTable extends LightningElement {
    
     columns = COLUMNS;
     accounts= [];
     draftValues = [];
     wiredResult;
     error;
     sortedBy;
     sortedDirection = 'asc';

    // Handling and customize the data
     @wire(accountData)
     getAccountData(result){
      this.wiredResult=result;
        if (result.data) {
        this.accounts = result.data.map(acc => ({
            ...acc,
            accountUrl: `/lightning/r/Account/${acc.Id}/view`,
            ratingClass: acc.Rating === 'Hot'
                ? 'slds-text-title_bold slds-text-color_success'
                : 'slds-text-title_bold'
        }));
           this.error = undefined;
        }
        else if(result.error){
               this.error = result.error;
               this.accounts = [];
               console.error('Error fetching accounts:', error);
        }
     }
      // save the edit item
      async handleSave(event) {
        const updatedFields = event.detail.draftValues;
        
            await updateAccounts({ accountsToUpdate: updatedFields });

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Accounts updated successfully',
                    variant: 'success'
                })
            );

            this.draftValues = [];
            await refreshApex(this.wiredResult);
     }
      // sorting the column
        handleSort(event) {
            const { fieldName, sortDirection } = event.detail;

            this.sortedBy = fieldName;
            this.sortedDirection = sortDirection;

            this.sortData(fieldName, sortDirection);
        }

        sortData(fieldName, direction) {
            let data = [...this.accounts];

            let isReverse = direction === 'asc' ? 1 : -1;

            data.sort((a, b) => {
                let valueA = a[fieldName] ? a[fieldName] : '';
                let valueB = b[fieldName] ? b[fieldName] : '';

                return isReverse * ((valueA > valueB) - (valueB > valueA));
            });

            this.accounts = data;
       }

     
}