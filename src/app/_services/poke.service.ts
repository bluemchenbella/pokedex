import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForageCache} from 'ngforage';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {from, Observable, of} from 'rxjs';
import {PokelistResponse} from '../_models/pokelist-response';
import {Pokemon} from '../_models/pokemon';
import {EvolutionChain} from '../_models/evolution-chain';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  private baseUrl = 'https://pokeapi.co/api/v2/';

  private urlList = this.baseUrl + 'pokemon?limit=<limit>&offset=<offset>';
  private urlDetail = this.baseUrl + 'pokemon/<id>';

  constructor(private http: HttpClient, private ngf: NgForageCache) { }

  getList(limit: number, offset: number): Observable<PokelistResponse> {
    const url = this.urlList.replace('<limit>', limit + '').replace('<offset>', offset + '');

    return this.get(url);
  }

  getPreviousOrNext(url: string): Observable<PokelistResponse> {
    return this.get(url);
  }

  getDetail(id: string): Observable<Pokemon> {
    const url = this.urlDetail.replace('<id>', id);

    return this.get(url);
  }

  getEvolutionChain(url: string): Observable<EvolutionChain> {
    return this.get(url).pipe(
      mergeMap(species => this.get(species.evolution_chain.url))
    );
  }

  private get(url: string): Observable<PokelistResponse | Pokemon | any> {
    const cacheKey = url;

    // Check if the request is cached already
    return from(this.ngf.getCached(cacheKey))
      .pipe(
        switchMap(cachedItem => {
          // Item found in cache and hasn't expired yet
          if (cachedItem.hasData && !cachedItem.expired) {
            return of(cachedItem.data);
          }

          // Item not found - retrieve it
          return this.http.get<PokelistResponse | Pokemon | any>(url).pipe(
            tap(response => {
              // Cache the response for 5 minutes
              this.ngf.setCached(cacheKey, response, 300000)
                .catch(e => {
                  console.error(`Failed to cache GET ${url}:`, e);
                });
            })
          );
        })
      );
  }
}
