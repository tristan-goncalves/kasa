import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Listing } from '../_interfaces/listing';
import { environment } from '../../environments/environment';

const BASE = environment.apiBaseUrl || '/api';

interface ApiListing {
  id: string;
  title: string;
  location: string;
  cover?: string;
  pictures?: string[];
  tags?: string[];
  rating: string | number;
  host?: { name?: string; picture?: string };
  description?: string;
  equipments?: string[];
}

// Fait en sorte que ce que me renvoie l'API corresponde à ce que je veux dans mon app
function toListing(dto: ApiListing): Listing {
  return {
    id: String(dto.id),
    title: dto.title,
    location: dto.location,
    // Pour éviter de péter le carrousel si pas d'images
    pictures: dto.pictures && dto.pictures.length
      ? dto.pictures
      : (dto.cover ? [dto.cover] : []),
    tags: dto.tags ?? [],
    rating: Number(dto.rating ?? 0),
    host: {
      name: dto.host?.name ?? '',
      picture: dto.host?.picture ?? ''
    },
    description: dto.description ?? '',
    equipments: dto.equipments ?? [],
    cover: dto.cover
  };
}

@Injectable({ providedIn: 'root' })
export class ListingsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Listing[]> {
    return this.http.get<ApiListing[]>(`${BASE}/properties`).pipe(
      map(arr => (arr ?? []).map(toListing)),
      catchError(this.handle)
    );
  }

  getById(id: string): Observable<Listing> {
    return this.http.get<ApiListing>(`${BASE}/properties/${id}`).pipe(
      map(toListing),
      catchError(this.handle)
    );
  }

  private handle(err: HttpErrorResponse) {
    return throwError(() => ({ status: err.status, message: err.message }));
  }
}
