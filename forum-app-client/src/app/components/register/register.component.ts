import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/IUser.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  formRegister!:FormGroup;
  formBuilder:FormBuilder = inject(FormBuilder);
  authService:AuthService = inject(AuthService);
  private router: Router = inject(Router);


  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
       user:["",Validators.required],
       password:["",Validators.required],
       confirmPassword:["",Validators.required]

    },
    {
      validators: this.matchValidator('password', 'confirmPassword')
    }
  );
  }

  get username() {
    return this.formRegister.get('user');
  }

  get password() {
    return this.formRegister.get('password');
  }

  get confirmPassword(){
    return this.formRegister.get('confirmPassword');
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
          const error = { confirmedValidator: 'Passwords do not match.' };
          matchingControl!.setErrors(error);
          return error;
        } else {
          matchingControl!.setErrors(null);
          return null;
        }
    }
  }

  register(){
    if(this.formRegister.invalid){
      return;
    }
    let user:User = {} as User;
      user.username = this.formRegister.controls["user"].value,
      user.passwordHash = this.formRegister.controls["password"].value
      this.authService.register(user).subscribe(s=>{
        console.log(s);
        this.authService.userId =s;
        this.router.navigate(['/forum']);
      })
    }
  }

