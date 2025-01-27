import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';
import { PokemonCardComponent } from '../../shared/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PokemonCardComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  isLoading = false;
  offset = 0;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottomPosition = document.body.offsetHeight; 
    if (scrollPosition >= bottomPosition && !this.isLoading) {
      this.loadPokemons();
    }
  }

  toggleFavorite(pokemonId: number): void {
    this.favoritesService.toggleFavorite(pokemonId);
  }

  isFavorite(pokemonId: number): boolean {
    return this.favoritesService.isFavorite(pokemonId);
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
