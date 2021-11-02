import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/Services/UserService/userservice.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  ForgotForm!: FormGroup;

  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ForgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  forgot() {
    this.userService.Forgot(this.ForgotForm.value).subscribe(
      (result: any) => {
        this.snackBar.open(result.message, '', { duration: 15000 });
        if (result.status == true) {
          console.log(result);
          this.router.navigateByUrl('/login');
        }
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.message, '', { duration: 15000 });
        if (error.error.message == "User Doesn't Exist") {
          console.log(error.error.message);
          this.router.navigateByUrl('/register');
        }
      }
    );
  }
}
