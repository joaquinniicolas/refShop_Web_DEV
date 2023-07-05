import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {

  showTooltip: boolean = false;

  @Input() data: number | undefined; // Propiedad de entrada para recibir los datos del tooltip


  constructor() { }

  ngOnInit(): void {



  }

}
