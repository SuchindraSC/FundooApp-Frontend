import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserserviceService } from 'src/app/Services/UserService/userservice.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  token = '';
  email = '';
  ResetForm!: FormGroup;
  hide = true;
  disState = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.token += params.get('token');
    });
    
    this.ResetForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
        ),
        Validators.minLength(8),
      ]),
      confirm: new FormControl('', Validators.required),
    });
  }

  Reset() {
    this.userService.Reset(this.email, this.ResetForm.value).subscribe(
      (result: any) => {
        console.log(result);
        this.snackBar.open(result.message, '', { duration: 30000 });
        if(result.status == true){
          this.router.navigateByUrl('/login');
        }
      });
  }
}

