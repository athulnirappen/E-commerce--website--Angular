import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {
  Product!: any
  sectionId!: any
  
  constructor(private route:ActivatedRoute,private api:ApiService){}
 

   ngOnInit(): void {

     this.sectionId=this.route.snapshot.paramMap.get('id')
    this.getsingleProduct()
   }
  
  getsingleProduct() {
    this.api.getsingleproduct(this.sectionId).subscribe({
      next: (res: any) => {
        console.log(res.data);
        
        this.Product = res.data
        
        // this.Product.forEach((a:any) => {
        //   Object.assign(a,{quantity:1,total:a.price})
          
        // });
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

 

}
