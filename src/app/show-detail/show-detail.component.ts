import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Show, Cast } from '../show';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {
    show: Show | undefined;
    cast: Cast[] | undefined;

    constructor(private route: ActivatedRoute, private showsService: ShowsService) {}

    ngOnInit() {
        this.getShow();
        this.getCast();
    }

    getShow(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.showsService.getShow(id)
            .subscribe(show => this.show = show)
    }

    getCast(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.showsService.getCast(id)
            .subscribe(cast => this.cast = cast)
    }
}
