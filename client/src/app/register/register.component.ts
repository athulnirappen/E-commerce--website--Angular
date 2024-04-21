
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/validators/confirmpasswordvalidator';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
  });




  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: passwordValidator('password', 'confirmPassword'),
      }
    );
  }

  register() {
    this.api.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
         (async () => {
           await this.Toast.fire({
             icon: 'success',
             title: 'User registerd successfully',
           });
         })();
        
        this.registerForm.reset();
        this.route.navigateByUrl('');
      },
      error: (err: any) => {
         (async () => {
           await this.Toast.fire({
             icon: 'error',
             title: 'Something went wrong',
           });
         })();
        console.log(err);
      },
    });
  }
}
