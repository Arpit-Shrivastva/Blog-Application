import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/guards/auth.service';
import { Register } from 'src/app/model/register';
import { LoginCheckService } from 'src/app/services/login-check.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private formBuiler: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginCheck: LoginCheckService,
    private login: RegisterService,
    private authService: AuthService) { }

  loginForm = this.formBuiler.group({
    email: ["", [Validators.required, this.emailValidation]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
  })

  get email() { return this.loginForm.get("email"); }
  get password() { return this.loginForm.get("password"); }

  emailValidation(email: AbstractControl) {
    const emailvalue = email.value;
    if (emailvalue.startsWith('0') || emailvalue.startsWith('1') || emailvalue.startsWith('2') || emailvalue.startsWith('3') || emailvalue.startsWith('4') || emailvalue.startsWith('5') || emailvalue.startsWith('6') || emailvalue.startsWith('7') || emailvalue.startsWith('8') || emailvalue.startsWith('9') || !emailvalue.endsWith('gmail.com')) {
      return { invalidemail: true };
    }
    else {
      return null;
    }
  }

  onSubmit() {
    let loginData: Register = this.loginForm.value as Register;

    this.loginCheck.setemail(loginData.email);

    this.login.getAllUser().pipe(
      switchMap((users) => {
        // Find the user that matches the email
        const user = users.find(u => u.email === loginData.email);

        if (user && user.password === loginData.password) {
          // If user found and password matches, proceed with login
          this.authService.login();
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'blue']
          });
          this.router.navigateByUrl("/dashboard");
          return of(true); // Return observable with true value
        } else {
          // If user not found or password doesn't match, return observable with false value
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'blue']
          });
          return throwError('Invalid email or password');
        }
      }),
      catchError((error) => {
        console.error('Login error:', error); // Log the error
        this.snackBar.open('An error occurred during login. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'blue']
        });
        return of(false); // Return observable with false value in case of error
      })
    ).subscribe();
  }



}
