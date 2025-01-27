import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Input() isFavorite: boolean = false;
  @Output() toggleFavorite = new EventEmitter<number>();

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.pokemon.id);
  }
}
