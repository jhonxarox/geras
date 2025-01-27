import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatCardModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  isLoading = false;
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottomPosition = document.body.offsetHeight - 200; // Trigger when 200px from bottom
    if (scrollPosition >= bottomPosition && !this.isLoading) {
      this.loadPokemons();
    }
  }

  loadPokemons(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    this.pokemonService.getPokemonList(this.offset).subscribe((pokemonList) => {
      const detailRequests = pokemonList.map((pokemon) =>
        this.pokemonService.getPokemonDetail(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
        )
      );

      forkJoin(detailRequests).subscribe((detailedPokemonList) => {
        this.pokemonList = [...this.pokemonList, ...detailedPokemonList];
        this.offset += 30; 
        this.isLoading = false;
      });
    });
  }
}
