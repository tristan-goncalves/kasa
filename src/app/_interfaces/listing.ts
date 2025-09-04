export interface Host { name: string; picture: string; }

export interface Listing {
  id: string;
  title: string;
  location: string;
  pictures: string[];
  tags: string[];
  rating: number;
  host: Host;
  description: string;
  equipments: string[];
  cover?: string;
}
