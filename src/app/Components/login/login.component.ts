import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/Services/UserService/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  hide = true;

  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.checkLocalStorage()
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
        ),
        Validators.minLength(8),
      ]),
    });
  }
  Login() {
    this.userService.Login(this.LoginForm.value).subscribe(
      (result: any) => {
        console.log(result)
        this.snackBar.open(result.message, '', { duration: 3000 });
        if (result.status == true) {
          this.LocalStorage(result.data, 'FundooUser');
          this.LocalStorage(result.tokenString, 'FundooNotesJWT')
          this.route.navigateByUrl('/dashboard');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.snackBar.open(error.error.message, '', { duration: 3000 });
      }
    );
  }

  LocalStorage(data: any , name: any){
    var user = localStorage.getItem(name);
    if (user != null){
      localStorage.removeItem(name);
    }
    user = data;
    localStorage.setItem(name,JSON.stringify(user));
  }

  checkLocalStorage(){
    var user = localStorage.getItem('FundooUser');
    if(user != null){
      this.route.navigateByUrl('/dashboard');
    }
  }
}
