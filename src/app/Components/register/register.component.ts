import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { UserserviceService } from 'src/app/Services/UserService/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;
  hide = false;

  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.RegisterForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Z]{1}[a-zA-Z]{2,}$'),
          Validators.minLength(3),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Z]{1}[a-zA-Z]{2,}$'),
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
          ),
          Validators.minLength(8),
        ]),
        confirm: new FormControl('', Validators.required),
      },
    );
  }


  Register() {
    this.userService.Register(this.RegisterForm.value).subscribe(
      (result: any) => {
        console.log(result);
        this.snackBar.open(result.message, '', { duration: 3000 });
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.message, '', { duration: 3000 });
        if (error.error.message == 'User Already Registered') {
          console.log(error.error.message);
          this.router.navigateByUrl('/login');
        }
      }
    );
  }
}
