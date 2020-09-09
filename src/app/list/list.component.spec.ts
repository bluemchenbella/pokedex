import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {HttpClientModule} from '@angular/common/http';
import {PokeService} from '../_services/poke.service';
import {Observable, of} from 'rxjs';
import {PokelistResponse} from '../_models/pokelist-response';
import {By} from '@angular/platform-browser';
import {element} from 'protractor';

class MockPokeService {
  getList(limit: number, offset: number): Observable<PokelistResponse> {
    const response = {
      count: 1050,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=1',
      previous: null,
      results: []
    };
    const pokemon = {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/'
    };

    for (let i = 0; i < limit; i++) {
      response.results.push(pokemon);
    }

    return of(response);
  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let pokeService: PokeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ HttpClientModule ],
      providers: [{ provide: PokeService, useClass: MockPokeService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pokeService = TestBed.inject(PokeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have list set after construction', () => {
    expect(component.list).toBeDefined();
    expect(component.list.length).toEqual(component.limit);
  });

  it('should render list elements', () => {
    const el = fixture.debugElement.queryAll(By.css('.list-group a'));
    expect(el.length).toEqual(component.limit);
  });

  it('should have previous button disabled', () => {
    component.previous = null;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.pagination > li:first-child'));
    expect(el.classes.disabled).toBeTrue();
  });

  it('should have next button disabled', () => {
    component.next = null;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.pagination > li:last-child'));
    expect(el.classes.disabled).toBeTrue();
  });

});
