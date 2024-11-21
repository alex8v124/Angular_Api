// src/app/servicios/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosInterface } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://127.0.0.1:3000/usuarios';  // URL de la API Loopback

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(res=>res);
  }

  // Método para obtener un usuario por ID
  getUsuarioById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: UsuariosInterface): Observable<UsuariosInterface> {
    return this.http.post<UsuariosInterface>(this.apiUrl, usuario);
  }
  updateUsuario(id: string, usuario: UsuariosInterface): Observable<UsuariosInterface> {
    return this.http.put<UsuariosInterface>(`${this.apiUrl}/${id}`, usuario);
  }


  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
