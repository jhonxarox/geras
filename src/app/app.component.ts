import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'geras';
  debugMode = environment.debug; 

  pokemonTypes: string[] = [
    'fire',
    'water',
    'grass',
    'electric',
    'ice',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ground',
    'dragon',
    'dark',
    'steel',
    'fairy',
    'normal',
    'poison',
    'ghost',
    'fighting',
  ];

  selectedType: string = 'all';

  constructor(private router: Router) {
    if (this.debugMode) {
      console.log('Debug mode is enabled');
    }
  }

  onTypeFilterChange(event: Event): void {
    this.selectedType = (event.target as HTMLSelectElement).value;

    this.router.navigate(['/pokemon-list'], {
      queryParams: { type: this.selectedType },
    });
  }

  shouldShowFilter(): boolean {
    return this.router.url.startsWith('/pokemon-list');
  }
}
