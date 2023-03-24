import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Show, Genre, Cast } from './show';

@Injectable({
  providedIn: 'root'
})

export class ShowsService {

  constructor(private http: HttpClient) { }
  private showsUrl = 'https://api.themoviedb.org/3/search/tv?language=en-US&page=1&include_adult=false&api_key=';
  private apiKey = '1c908b5035526e04a18f9e1c479285db';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  
  searchShows(searchTerm: string): Observable<Show[]> {
    if (!searchTerm.trim()) {
        return of([]); 
    }
    return this.http.get<Show[]>(`${this.showsUrl + this.apiKey}&query=${searchTerm}`).pipe(
        map((response: any) => response['results']),
        catchError(this.handleError<Show[]>('searchShows', []))
    );
  }

  getShow(id: number): Observable<Show> {
      return this.http.get<Show>(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=en-US`);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`https://api.themoviedb.org/3/genre/tv/list?api_key=${this.apiKey}&language=en-US`).pipe(
        map((response: any) => response['genres']),
        catchError(this.handleError<Genre[]>('getGenres', []))
    );
  }

  getCast(id: number): Observable<Cast[]> {
    return this.http.get<Cast[]>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.apiKey}&language=en-US`).pipe(
        map((response: any) => response['cast']),
        catchError(this.handleError<Cast[]>('getCast', []))
    );
  }
}
