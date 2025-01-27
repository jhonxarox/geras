import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonApiResponse, PokemonDetail } from '../models/pokemon.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/pokemon`;

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0, limit: number = 30): Observable<any[]> {
    return this.http
      .get<PokemonApiResponse>(`${this.apiUrl}?offset=${offset}&limit=${limit}`)
      .pipe(
        map((response) =>
          response.results.map((pokemon: any, index: number) => ({
            name: pokemon.name,
            id: offset + index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              offset + index + 1
            }.png`,
          }))
        )
      );
  }

  getPokemonDetail(url: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(url);
  }
}
