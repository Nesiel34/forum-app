import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/IUser.interface';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDividerModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formLogin!:FormGroup;
  formBuilder:FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  authService:AuthService = inject(AuthService);


  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
       user:["",Validators.required],
       password:["",Validators.required]
    });
  }

  login(){

    if(this.formLogin.invalid){
      return;
    }
    let user:User = {} as User;
      user.username = this.formLogin.controls["user"].value,
      user.passwordHash = this.formLogin.controls["password"].value
      this.authService.login(user).subscribe(resLogin=>{
        console.log(resLogin);
        if(resLogin){
          this.authService.userId = resLogin;
          this.router.navigate(['/forum']);
        }
      })
    }


    get username() {
      return this.formLogin.get('user');
    }

    get password() {
      return this.formLogin.get('password');
    }

  }
