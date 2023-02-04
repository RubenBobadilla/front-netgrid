import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public regUser :any;
  public email = new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  public name = new FormControl('', [Validators.required, Validators.minLength(5)]);
  public city = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Funcion que captura los datos del formulario de registro del usuario
   */
  register(){
    this.regUser = {
      "name" : this.name.value,
      "email" : this.email.value,
      "password": this.password.value,
      "city": this.city.value
    }
    // Peticion para almacenar los datos
    this.authService.register(this.regUser).subscribe(
      res => {
        alert(res.message);
        this.router.navigate(['login']); // Redirigir al Login
        console.log(res);
      },
      error => {
        console.log(<any>error);
      }
      
    )
  }

}
