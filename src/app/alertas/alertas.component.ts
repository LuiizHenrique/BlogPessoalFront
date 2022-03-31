import { AlertasService } from './../service/alertas.service';
import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)


  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.tipo = this.userLogin.tipo

      this.router.navigate(['/inicio'])
    }, erro =>{
      if(erro.status == 500){
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
      }
    })
  }

}