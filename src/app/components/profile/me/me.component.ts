import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  public upUser: any;
  formPerfil: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.index();
  }

  createForm(){
    this.formPerfil = this.fb.group({
      id: new FormControl('', []),
      name: new FormControl('', []),
      address: new FormControl('', []),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      mail: new FormControl('', []),
      city: new FormControl('', []),
      birthdate: new FormControl('', [])
    });
  }

  /**
   * Consulta los datos referentes al user logueado
   */
  index() {
    this.authService.index().subscribe(
      res => {
        console.log(res);
        console.log(res.userData['id']);
        // Mostrar los datos en el formulario
        this.formPerfil.controls['id'].setValue(res.userData['id']);
        this.formPerfil.controls['name'].setValue(res.userData['name']);
        this.formPerfil.controls['address'].setValue(res.userData['address']);
        this.formPerfil.controls['pass'].setValue(res.userData['pass']);
        this.formPerfil.controls['mail'].setValue(res.userData['email']);
        this.formPerfil.controls['city'].setValue(res.userData['city']);
        this.formPerfil.controls['birthdate'].setValue(res.userData['birthdate']);
      }, 
      error =>{
        alert('Existe un error en la comunicación con el Servidor, /n Comunicate con el Administrador');
        console.log(error);
      }
    )
  }

  /** 
   * Capturar los datos del formulario y enviarlos para la actualizacion en la db
   */
  update(){
    let id = this.formPerfil.value['id'];
    console.log(id);

    this.upUser = {
      "name": this.formPerfil.value['name'],
      "address": this.formPerfil.value['address'],
      "city": this.formPerfil.value['city'],
      "birthdate": this.formPerfil.value['birthdate'],
    }

    /** Invocar la peticion http */
    this.authService.upUser(this.upUser, id).subscribe(
      res => {
        alert(res['message']);
        console.log(res);
        this.index();
        //this.router.navigate(['/product/index']);
      },
      error => {
        alert('Existe un error en la comunicación con el Servidor, /n Comunicate con el Administrador');
        console.log(error);
      }
    );

    

  }

}
