import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm!:FormGroup

  constructor(private fb:FormBuilder,private api:ApiService){}
  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email:['',Validators.compose([Validators.required,Validators.email])]
    })
    
  }

  submit() {
    this.api.sendEmail(this.forgetForm.value.email).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Email send successfully')
        
      },
      error: (err) => {
        console.log(err);
        
      }
    })
    
  }

  cancel() {
    this.forgetForm.reset()
  }

}
