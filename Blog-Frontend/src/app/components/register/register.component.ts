import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Register } from 'src/app/model/register';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  ingredient: any;

  constructor(private formBuiler: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private snackBar: MatSnackBar) { }

  registerForm = this.formBuiler.group({
    fname: ["", [Validators.required, Validators.minLength(2)]],
    lname: [""],
    email: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    number: ["", [Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.minLength(10), Validators.maxLength(10),]],
    gender: ["", [Validators.required]],
    image: ["", [Validators.required]]
  })


  onSubmit() {
    let registerData: Register = this.registerForm.value as unknown as Register;
    const fData = new FormData();

    fData.append('userData', JSON.stringify(registerData));

    this.registerService.registerSaveEndPoint(registerData).subscribe({
      next: data => {
        this.snackBar.open('Registration Successful', 'Close', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'blue']
        });
        this.router.navigateByUrl("/login-page");
      }, error(err) {
        alert("Something Went Wrong");
      },
    })
  }

}
