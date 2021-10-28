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
        this.snackBar.open(result.message, '', { duration: 30000 });
        if (result.status == true) {
          this.LocalStorage(result.data);
          this.route.navigateByUrl('/dashboard');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.snackBar.open(error.error.message, '', { duration: 30000 });
      }
    );
  }

  LocalStorage(data: any){
    var user = localStorage.getItem('FundooUser');
    if (user != null){
      localStorage.removeItem('FundooUser');
    }
    user = data;
    localStorage.setItem('FundooUser',JSON.stringify(user));
  }

  checkLocalStorage(){
    var user = localStorage.getItem('FundooUser');
    if(user != null){
      this.route.navigateByUrl('/dashboard');
    }
  }
}
