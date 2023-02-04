import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  /** Declarar las variables */
  private URL: string;
  private URLBack: string;
  public user: string;
  public res: boolean;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.URL = 'https://pokeapi.co/api/v2';
    this.URLBack = 'http://127.0.0.1:8000/api/auth';
  }

  /**
   * Consulta la Api de Pokemon y devuelve una lista de todos los pokemos existentes
   * @returns 
   */
  index(): Observable<any> {
    return this.http.get(this.URL + '/pokemon?limit=100&offset=0');
  }

  /**
   * @param id Consulta un pokemon en especifico, segun el id enviado por parametro
   * @returns 
   */
  showId(id: number): Observable<any>{
    return this.http.get(this.URL + '/pokemon/' + id);
  }

}
