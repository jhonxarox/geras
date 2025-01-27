import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: Set<number> = new Set<number>();

  constructor() {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      this.favorites = new Set(JSON.parse(savedFavorites));
    }
  }

  getFavorites(): number[] {
    return Array.from(this.favorites);
  }

  isFavorite(pokemonId: number): boolean {
    return this.favorites.has(pokemonId);
  }

  addFavorite(pokemonId: number): void {
    this.favorites.add(pokemonId);
    this.saveFavorites();
  }

  removeFavorite(pokemonId: number): void {
    this.favorites.delete(pokemonId);
    this.saveFavorites();
  }

  toggleFavorite(pokemonId: number): void {
    if (this.isFavorite(pokemonId)) {
      this.removeFavorite(pokemonId);
    } else {
      this.addFavorite(pokemonId);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem(
      'favorites',
      JSON.stringify(Array.from(this.favorites))
    );
  }
}
