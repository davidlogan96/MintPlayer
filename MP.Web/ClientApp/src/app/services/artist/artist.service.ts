import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../../entities/artist';
import { PaginationRequest } from '../../helpers/pagination-request';
import { PaginationResponse } from '../../helpers/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  public pageArtists(request: PaginationRequest) {
    return this.httpClient.post<PaginationResponse<Artist>>(`${this.baseUrl}/web/v2/artist/page`, request).toPromise();
  }

  public getArtists(include_relations: boolean) {
    return this.httpClient.get<Artist[]>(`${this.baseUrl}/web/v2/artist`, {
      headers: {
        'include_relations': String(include_relations)
      }
    }).toPromise();
  }

  public getArtist(id: number, include_relations: boolean) {
    return this.httpClient.get<Artist>(`${this.baseUrl}/web/v2/artist/${id}`, {
      headers: {
        'include_relations': String(include_relations)
      }
    }).toPromise();
  }

  public pageFavoriteArtists(request: PaginationRequest) {
    return this.httpClient.post<PaginationResponse<Artist>>(`${this.baseUrl}/web/v2/artist/favorite`, request).toPromise();
  }

  public getFavoriteArtists() {
    return this.httpClient.get<Artist[]>(`${this.baseUrl}/web/v2/artist/favorite`).toPromise();
  }

  public createArtist(artist: Artist) {
    return this.httpClient.post<Artist>(`${this.baseUrl}/web/v2/artist`, artist).toPromise();
  }

  public updateArtist(artist: Artist) {
    return this.httpClient.put<Artist>(`${this.baseUrl}/web/v2/artist/${artist.id}`, artist).toPromise();
  }

  public deleteArtist(artist: Artist) {
    return this.httpClient.delete(`${this.baseUrl}/web/v2/artist/${artist.id}`).toPromise();
  }
}
