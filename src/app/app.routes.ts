import { Routes } from '@angular/router';
import { PokemonListComponent } from './features/pokemon-list/pokemon-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemon-list', pathMatch: 'full' },
  {
    path: 'pokemon-list',
    loadComponent: () =>
      import('./features/pokemon-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./features/pokemon-details/pokemon-details.component').then(
        (m) => m.PokemonDetailsComponent
      ),
  },
];
