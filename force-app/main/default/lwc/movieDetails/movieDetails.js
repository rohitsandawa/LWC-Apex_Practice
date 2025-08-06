import { LightningElement, wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import MOVIE_CHANNEL from '@salesforce/messageChannel/movieChannel__c';

const API_KEY="940ea210";
export default class MovieDetails extends LightningElement {
   subscription = null;
   loadComponent = false;
   movieDetails={};
   
   @wire(MessageContext)
    messageContext;


   // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    } 
    disconnectedCallback() { 
        this.unsubscribeToMessageChannel();
    } 

     // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                MOVIE_CHANNEL,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
    // Handler for message received by component
    handleMessage(message) {
        let movieId = message.movieId;
        console.log("movieId", movieId);
        this.fetchMovieDetails(movieId);
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

      async fetchMovieDetails(movieId) {
         console.log('Fetching details for:', movieId);
        let url = `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${API_KEY}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('detail of movie',data);
            this.movieDetails = data;

           
            
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            this.loadComponent = true;
        }
    }

    get rottenTomatoesRating() {
    if (this.movieDetails ) {
        const rtRating = this.movieDetails.Ratings.find(rating => rating.Source === 'Rotten Tomatoes');
        return rtRating ? rtRating.Value : 'N/A'; 
    }
    return 'N/A'; 
}


}

