import { LightningElement ,api} from 'lwc';

export default class MovieTile extends LightningElement {
  @api movie;
  @api selectedMovieId;

  clickHandler(event){
    console.log( 'from tile js imdbID',this.movie.imdbID);
    // use custom event 
    const evt = new CustomEvent("selectedmovie",{
      detail: this.movie.imdbID

    });

     this.dispatchEvent(evt);
  }

  // get tileSelected(){
  //   return this.selecteMovieId===this.movie.imdbID?'tile selected':'tile';
  // }
}