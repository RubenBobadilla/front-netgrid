import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Declarar las variables */
  private URL: string;
  public user: string;
  public res: boolean;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.URL = 'http://127.0.0.1:8000/api/auth';
  }

  /** 
   * Permite Loguear un usuario existente
   */
  singIn(user: JSON): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL + '/login', params);
  }

  /**
   * Permite registra los datos de un nuevo usuario
   */
  register(user: JSON): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL + '/register', params);
  }

  /**
  * Peticion http Retorna los datos del usuario logueado
  * @returns 
  */
   index(): Observable<any> {
    return this.http.get(this.URL + '/mePerfil');
  }

  /**
   * Actualiza la informacion de un usuario Registrado y Logueado
   */
  upUser(regUser: JSON, id: number) {
    let params = JSON.stringify(regUser);
    return this.http.post(this.URL + '/upPerfil/' + id, params);
  }
  

  /**
   * Valida si el token existe o ha Expirado
   * @returns : Boolean
   */
  isAuth(): Boolean {
    this.res = true;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      this.res = false;
    }
    return this.res;
  }

  /**
   * Borra los datos almacenados en el local del User
   */
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  }



}
