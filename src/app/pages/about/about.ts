import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgIf, NgFor, Header, Footer],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class AboutComponent {
  open = -1; // Les éléments sont fermés par défaut
  items = [
    {
      title: 'Fiabilité',
      text: `Les annonces postées sur Kasa garantissent une fiabilité totale.
Les photos sont conformes aux logements, et toutes les informations sont
régulièrement vérifiées par nos équipes.`
    },
    { title: 'Respect', text: `Le respect est une valeur fondamentale chez Kasa...` },
    { title: 'Service', text: `Nos équipes sont à votre écoute pour assurer un service optimal...` },
    { title: 'Sécurité', text: `La sécurité est la priorité de Kasa, pour nos hôtes comme nos voyageurs...` }
  ];

  toggle(i: number) { this.open = this.open === i ? -1 : i; } // Ouvre ou ferme l'élément i
}
