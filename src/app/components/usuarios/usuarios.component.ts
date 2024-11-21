import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsuariosInterface } from '../../interfaces/usuarios.interface';
import { UsuarioService } from './../../servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  profileForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  usuarioList: UsuariosInterface[] = [];
  selectedUsuarioId: string | null = null; // Para almacenar el ID del usuario seleccionado

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (result) => {
        this.usuarioList = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createUsuario() {
    const newUsuario: UsuariosInterface = {
      nombre: this.profileForm.value.nombre ?? '',
      apellido: this.profileForm.value.apellido ?? '',
      email: this.profileForm.value.email ?? '',
      password: this.profileForm.value.password ?? ''
    };

    console.log('Datos a enviar al crear usuario:', newUsuario);

    this.usuarioService.createUsuario(newUsuario).subscribe({
      next: (result) => {
        console.log('Usuario creado con éxito:', result);
        this.getUsuarios();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al crear el usuario:', err);
      }
    });
  }

  updateUsuario() {
    if (this.selectedUsuarioId) {
      const updatedUsuario: UsuariosInterface = {
        id: this.selectedUsuarioId,
        nombre: this.profileForm.value.nombre ?? '',
        apellido: this.profileForm.value.apellido ?? '',
        email: this.profileForm.value.email ?? '',
        password: this.profileForm.value.password ?? ''
      };

      console.log('Datos a enviar para actualizar usuario:', updatedUsuario);

      this.usuarioService.updateUsuario(this.selectedUsuarioId, updatedUsuario).subscribe({
        next: (result) => {
          console.log('Usuario actualizado con éxito:', result);
          this.getUsuarios();
          this.resetForm();
          this.selectedUsuarioId = null;
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
        }
      });
    }
  }

  selectUsuario(usuario: UsuariosInterface) {
    this.selectedUsuarioId = usuario.id as string;
    this.profileForm.setValue({
      nombre: usuario.nombre as string,
      apellido: usuario.apellido as string,
      email: usuario.email as string,
      password: usuario.password as string,
    });
  }


  deleteUsuario(id: string | undefined) {
    if (id === undefined) {
      console.warn('El ID del usuario es undefined. No se puede eliminar, pero continuaré con el flujo.');
      return;
    }
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => {
          console.log('Usuario eliminado con éxito');
          this.getUsuarios();
        },
        error: (err) => {
          console.error('Error al eliminar el usuario:', err);
        }
      });
    }
  }

  resetForm() {
    this.profileForm.reset(); // Limpiar el formulario
    this.selectedUsuarioId = null; // Reiniciar el ID seleccionado
  }

  trackById(index: number, item: UsuariosInterface): string {
    return item.id as string; // Método para optimizar la renderización
  }
}
