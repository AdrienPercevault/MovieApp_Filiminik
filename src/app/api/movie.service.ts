import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private listFilmUrl: string = "https://api.themoviedb.org/3/discover/movie";
  private idFilmUrl: string = "https://api.themoviedb.org/3/movie/"
  private popularFilmUrl: string = "https://api.themoviedb.org/3/movie/popular";
  private searchFilmUrl: string = "https://api.themoviedb.org/3/search/movie";
  
  private idPage = 1

  private httpOptions = {
    headers : new HttpHeaders ({
      "content-type": "application/js"
    }),

    params:{
      "api_key" : "2cd6b2b02d6b12a6963740c2aee74624",
      "language" : "fr-FR",
      "query": "",
      "page": this.idPage.toString(),
    }
  }

  constructor(private readonly http: HttpClient) {
  }
 
  getMovies(idPage: string): Observable<any> {
    this.httpOptions.params.page = idPage.toString();
    return this.http.get(this.listFilmUrl, this.httpOptions);
  }

  getMoviesId(id: string): Observable<any> {
    this.httpOptions.params.page = "1";
    return this.http.get(this.idFilmUrl + id, this.httpOptions);
  }

  getPopularMovies(idPage: string): Observable<any> {
    this.httpOptions.params.page = idPage.toString();
    return this.http.get(this.popularFilmUrl, this.httpOptions);
  }

  searchMovies(params): Observable<any> {
    this.httpOptions.params.query = params.filter;
    this.httpOptions.params.page = params.page;
    return this.http.get(this.searchFilmUrl, this.httpOptions);
  }
}
