import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,UsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'usuarios-angular';
}
