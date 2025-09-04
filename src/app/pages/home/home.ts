import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { ListingsService } from '../../_services/listings';
import { Listing } from '../../_interfaces/listing';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [NgFor, RouterLink, Header, Footer],
  standalone: true,
})
export class HomeComponent {
  listings: Listing[] = [];

  constructor(private svc: ListingsService) {}

  ngOnInit() {
    this.svc.getAll().subscribe(ls => this.listings = ls);
  }
}
