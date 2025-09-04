import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { ListingsService } from '../../_services/listings';
import { Listing } from '../../_interfaces/listing';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.html',
  styleUrls: ['./listing-detail.scss'],
  imports: [NgIf, NgFor, Header, Footer],
  standalone: true,
})
export class ListingDetailComponent {
  l?: Listing; // le logement à afficher
  i = 0; // index de l’image courante
  descOpen = true; // description ouverte par défaut
  eqOpen = true; // équipements ouverts par défaut

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: ListingsService
  ) {}

  // Au chargement, lire l’id dans l’URL et charger le logement
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.svc.getById(id).subscribe(x => {
      if (!x) { this.router.navigateByUrl('/not-found'); return; }
      this.l = x;
    });
  }

  // Navigation des images dans le carrousel
  prev() { if (!this.l) { return; } this.i = (this.i - 1 + this.l.pictures.length) % this.l.pictures.length; }
  next() { if (!this.l) { return; } this.i = (this.i + 1) % this.l.pictures.length; }
  
  // Renvoie un tableau de 5 booléens, chaque étoile pleine = un true 
  stars(n: number) { return Array.from({ length: 5 }, (_, k) => k < n); }
}
