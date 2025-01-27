import { Component, OnInit } from '@angular/core';
import { PokemonDetail } from '../../core/models/pokemon.model';
import { PokemonService } from '../../core/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerComponent } from '../../shared/image-viewer/image-viewer.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pokemon-details',
  imports: [MatCardModule, CommonModule],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent implements OnInit {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/pokemon`;
  pokemon!: PokemonDetail;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService
        .getPokemonDetail(`${this.apiUrl}/${id}`)
        .subscribe(
          (data) => {
            this.pokemon = data;
            this.isLoading = false;
          },
          (error) => {
            console.error('Failed to fetch Pokémon details:', error);
            this.isLoading = false;
          }
        );
    }
  }

  openImageViewer(): void {
    this.dialog.open(ImageViewerComponent, {
      data: { imageUrl: this.pokemon.sprites.front_default },
      panelClass: 'custom-dialog',
      width: '450px',
      height: 'auto',
    });
  }

  getStatColor(statName: string): string {
    switch (statName.toLowerCase()) {
      case 'hp': return '#ff5959';
      case 'attack': return '#f5ac78';
      case 'defense': return '#fae078';
      case 'special-attack': return '#9db7f5';
      case 'special-defense': return '#a7db8d';
      case 'speed': return '#fa92b2';
      default: return '#ccc';
    }
  }

  getTotalStats(): number {
    return this.pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  }
  
  convertHeightToMeter(height: number): number {
    return height / 10;
  }
  
  convertWeightToKilogram(weight: number): number {
    return weight / 10; 
  }
  
}
