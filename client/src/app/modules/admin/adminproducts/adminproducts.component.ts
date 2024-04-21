import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css'],
})
export class AdminproductsComponent implements OnInit {
  allProducts: any = [];
  searchkey: string = '';

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.api.getProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.data;
        console.log(this.allProducts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  delete(id: any) {
    this.api.deleteProduct(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAllProducts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
