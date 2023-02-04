import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public message :string;

  constructor(
    private authService: AuthService,
    private router:Router ) { }

  ngOnInit(): void {    
    /** Cerrar sesión */
    this.authService.logout();
    this.message = '¡Has cerrado sesión con éxito! ';
    this.router.navigate(['/login']);
  }

  /*logout(){  
    this.authService.logout();
    this.message = 'Session closed';
    this.router.navigate(['/home']);
  }*/

}
