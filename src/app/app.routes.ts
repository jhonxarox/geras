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
];
