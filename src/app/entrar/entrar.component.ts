import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private servicoDeAutenticacao: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0);
  }

  entrar() {
    this.servicoDeAutenticacao.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp

        environment.foto = this.usuarioLogin.foto
        environment.nome = this.usuarioLogin.nome
        environment.id = this.usuarioLogin.id
        environment.token = this.usuarioLogin.token

        this.route.navigate(['/inicio'])
    },
    error: erro => {
      if(erro.status == 401){
        alert('Usuário ou senha estão incorretos!')
      }
    }
    })
  }
}
