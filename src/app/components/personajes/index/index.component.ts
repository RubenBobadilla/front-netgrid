import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';

import { PersonajesService } from 'src/app/services/personajes.service';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public pokemons : any;
  showPersonajeForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private personajesService: PersonajesService,
    private router: Router,
  ) { 
    this.createForm();
    this.index();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.showPersonajeForm = this.fb.group({
      name: new FormControl('', []),
      altura: new FormControl('', []),
      urlArea: new FormControl('', []),
      weight: new FormControl('', []),      
    });
  }

  /** 
  * Lista todas los pokemon existentes 
  */
   index(): object {
    // Envia la petición
    this.personajesService.index().subscribe(
      res => {
        //for (let i=0; i <= this.pokemons['results'].length; i++ ){
        for (var idx in res['results']) {

          // Separamos en fragmentos el string de la URL para obtener el id del pokemon
          let urlPok = res['results'][idx]['url'];
          let arrUrl = urlPok.split('/');
          let long = arrUrl.length;
          let idPok = parseInt(arrUrl[long-2]);
          
          res['results'][idx]['id'] = idPok;  // Creamos el indice con el ID

        }
        this.pokemons = res['results'];
        console.log(this.pokemons);

      },
      error => {
        alert('Existe un error comunicate con el Administrador');
        console.log(error);
      }
    );
    return this.pokemons;
  }

  /**
   * Consulta el pokemon segun el Id seleccionado 
   * @param id 
   */
  show(id:number){
    // Envia la petición
    this.personajesService.showId(id).subscribe(
      res => {
       
        /** Mostrar datos en el FormShowId */
        this.showPersonajeForm.controls['name'].setValue(res['name']);
        this.showPersonajeForm.controls['altura'].setValue(res['height']);
        this.showPersonajeForm.controls['urlArea'].setValue(res['location_area_encounters']);
        this.showPersonajeForm.controls['weight'].setValue(res['weight']);
        console.log(res);
      },
      error => {
        alert('Existe un error! comunicate con el Administrador');
        console.log(error);
      }
    );
  }

  /**
   * Permite agregar un personaje como favorito para el usuario que lo selecione
   * @param ref_api 
   */
  saveLike(ref_api:string){
    console.log(ref_api);
  }
  

}
