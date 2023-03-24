import { Component } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ShowsService } from '../shows.service';

import { Show, Genre } from '../show';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    shows$!: Observable<Show[]>;
    genres!: Map<number, string>;

    constructor(private showsService: ShowsService) { }

    private searchTerms = new Subject<string>();

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.shows$ = this.searchTerms.pipe(
            debounceTime(300),

            distinctUntilChanged(),

            switchMap((term: string) => this.showsService.searchShows(term)),
        );
        this.showsService.getGenres()
        .subscribe(
            (genres: Genre[]) => 
            this.genres = genres.reduce((map: Map<number, string>, genre: Genre) => { map.set(genre.id, genre.name); return map; }, new Map<number, string>())
        );
    }
}
