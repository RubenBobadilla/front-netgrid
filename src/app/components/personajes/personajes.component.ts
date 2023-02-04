import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    $("#listarI").click(function() {
      $("#cardPersonajes").addClass("d-none");
    }); 
    
  }

}
