import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  editform!: FormGroup
  sectionId: any
  

  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router,private fb:FormBuilder) {
    
  }
  ngOnInit(): void {
    
    this.editform = this.fb.group({
      Id: '',
      productName: '',
      price: '',
      category: '',
      description: '',
      image: '',
    });
    
    this.sectionId = this.route.snapshot.paramMap.get('id')
    console.log(this.sectionId);
    this.getexistingProduct()
  }

  getexistingProduct() {
    this.api.getsingleproduct(this.sectionId).subscribe({
      next: (res: any) => {
        this.editform.patchValue(res.data)
      }
    }
      
    )
  }

  update() {
    this.api.updateProduct(this.sectionId, this.editform.value).subscribe({
      next:(res:any)=>{
        
        this.router.navigateByUrl('/admin/products')
        
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }





}
