import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/validators/confirmpasswordvalidator';
import { ApiService } from '../services/api.service';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup
  token!:string
  
  constructor( private fb:FormBuilder,private api:ApiService, private route:Router, private url:ActivatedRoute){}
  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: passwordValidator('password', 'confirmPassword'),
      }
    );
    this.url.params.subscribe(val => {
      this.token=val['token']
      console.log(this.token);
      
    })
  }

  submit() {
    let resetObj = {
      token: this.token,
      password:this.resetForm.value.password

    }

    this.api.resetPassword(resetObj).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert(res.message)
        this.resetForm.reset()
        this.route.navigateByUrl("")
      },
      error: (err) => {
        console.log(err);
        
      }
    })
    
    
  }

}
