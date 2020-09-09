import { Component, OnInit } from '@angular/core';
import {PokeService} from '../_services/poke.service';
import {PokelistItem} from '../_models/pokelist-item';
import {PokelistResponse} from '../_models/pokelist-response';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  offset = 0;
  limit = 15;
  list: PokelistItem[];
  previous: string;
  next: string;

  constructor(private pokeService: PokeService) { }

  ngOnInit(): void {
    this.pokeService.getList(this.limit, this.offset).subscribe(res => this.extractResponse(res));
  }

  loadPrevious(): void {
    this.pokeService.getPreviousOrNext(this.previous).subscribe(res => this.extractResponse(res));
  }

  loadNext(): void {
    this.pokeService.getPreviousOrNext(this.next).subscribe(res => this.extractResponse(res));
  }

  private extractResponse(response: PokelistResponse): void {
    if (response) {
      this.list = response.results;
      this.previous = response.previous;
      this.next = response.next;
      window.scrollTo(0, 0);
    }
  }

}
