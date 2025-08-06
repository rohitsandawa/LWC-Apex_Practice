import { LightningElement, wire } from 'lwc';
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import MOVIE_CHANNEL from '@salesforce/messageChannel/movieChannel__c';


const DELAY = 500;
const API_KEY="940ea210";
export default class MovieSearch extends LightningElement {
    SelectedType = '';
    SelectedSearch = '';
    SelectedPageNo = '1';
    delayTimeout;
    loading = false;
    searchResults = [];
    selectedMovie = '';
    @wire(MessageContext)
    messageContext;


    get typeOptions() {
        return [
            { label: 'None', value: '' },
            { label: 'Movie', value: 'movie' },
            { label: 'Series', value: 'series' }
        ];
    }

    handleChange(event) {
        const { name, value } = event.target;

        if (name === 'type') {
            this.SelectedType = value;
            } else if (name === 'search') {
                this.SelectedSearch = value;
                } else if (name === 'pageno') {
                    this.SelectedPageNo = value;
                }

        // Clear previous timeout to debounce properly
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }

        this.delayTimeout = setTimeout(() => { 
            this.searchMovie();
        }, DELAY);
    }

    async searchMovie() {
        // do not search if no search term
        if (!this.SelectedSearch) {
            this.searchResults = [];
            this.loading = false;
            return;
        }

        this.loading = true;
        const url = `https://www.omdbapi.com/?s=${this.SelectedSearch}&type=${this.SelectedType}&page=${this.SelectedPageNo}&apikey=${API_KEY}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log('Movie search output', data);

            if (data.Response === 'True' && Array.isArray(data.Search)) {
                this.searchResults = data.Search;
            } else {
                this.searchResults = [];
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
            this.searchResults = [];
        } finally {
            this.loading = false;
        }
    }
    get displaySearchResult() {
        return Array.isArray(this.searchResults) && this.searchResults.length > 0;
    }

     movieSelectedHandler(event) {
        this.selectedMovie = event.detail;
        const payload = { movieId: this.selectedMovie };

        publish(this.messageContext, MOVIE_CHANNEL, payload);
        console.log('Publishing movieId:', this.selectedMovie);
    }

     
}

