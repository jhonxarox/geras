import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  filteredPokemonList: any[] = [];
  isLoading = false;
  offset = 0;
  selectedType: string = 'all'; // Default to show all Pokémon

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedType = params['type'] || 'all';
      this.applyFilter();
    });
    
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
        this.filteredPokemonList = this.pokemonList;
        this.offset += 30;
        this.isLoading = false;
        this.applyFilter();
      });
    });
  }

  applyFilter(): void {
    if (this.selectedType === 'all') {
      this.filteredPokemonList = this.pokemonList;
    } else {
      this.filteredPokemonList = this.pokemonList.filter((pokemon) =>
        pokemon.types.some((type: any) => type.type.name === this.selectedType)
      );
    }
  }
}
