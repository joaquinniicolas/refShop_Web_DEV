import { Component, OnInit } from '@angular/core';


interface Mesa {
  numero: number;
  capacidad: number;
  estado: string;
  mozo: string;
  imagen: string;
}

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  mesas: Mesa[] = [
    {
      numero: 1,
      capacidad: 4,
      estado: 'Disponible',
      mozo: 'Juan Pérez',
      imagen: './src/app/svg mesa/'
    },
    {
      numero: 2,
      capacidad: 4,
      estado: 'Ocupada',
      mozo: 'María Rodríguez',
      imagen: 'https://i.imgur.com/AVtkJea.png'
    },
    {
      numero: 3,
      capacidad: 6,
      estado: 'Disponible',
      mozo: 'Pedro González',
      imagen: 'https://i.imgur.com/AVtkJea.png'
    }
  ];
}
