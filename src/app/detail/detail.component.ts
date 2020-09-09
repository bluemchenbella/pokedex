import { Component, OnInit } from '@angular/core';
import {PokeService} from '../_services/poke.service';
import {Pokemon} from '../_models/pokemon';
import {ActivatedRoute} from '@angular/router';
import {EvolutionItem} from '../_models/evolution-item';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  pokemon: Pokemon;
  evolutionChain: EvolutionItem;

  constructor(private route: ActivatedRoute, private pokeService: PokeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('id');

      this.pokeService.getDetail(name).subscribe(pokemon => {
        if (pokemon) {
          this.pokemon = pokemon;

          this.pokeService.getEvolutionChain(this.pokemon.species?.url).subscribe(
            evolutionChain => {
              if (evolutionChain) {
                this.evolutionChain = evolutionChain.chain;
              }
            }
          );
        }
      });
    });
  }

}
