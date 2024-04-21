import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  login() {
    this.api.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res.user);

        if (res.user.isAdmin) {
          (async () => {
            await this.Toast.fire({
              icon: 'success',
              title: 'Admin Logged',
            });
          })();

          this.route.navigateByUrl('/admin/dashboard');
        } else {
          (async () => {
            await this.Toast.fire({
              icon: 'success',
              title: 'User Logged',
            });
          })();

          this.route.navigateByUrl('home');
        }
        this.loginForm.reset();
      },
      error: (err: any) => {
        (async () => {
          await this.Toast.fire({
            icon: 'error',
            title: 'You are not Registered',
          });
        })();

        console.log(err);
      },
    });
  }
}
