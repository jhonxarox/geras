import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonCardComponent } from '../../shared/pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-list',
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss'
})
export class FavoritesListComponent implements OnInit {
  favoritePokemons: any[] = [];
  isLoading = false;

  constructor(
    private favoritesService: FavoritesService,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const favoriteIds = this.favoritesService.getFavorites();
    favoriteIds.forEach((id) => {
      this.pokemonService
        .getPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .subscribe((pokemon) => {
          this.favoritePokemons.push(pokemon);
        });
    });
  }

  toggleFavorite(pokemonId: number): void {
    this.favoritesService.toggleFavorite(pokemonId);
    this.favoritePokemons = this.favoritePokemons.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
  }
}
