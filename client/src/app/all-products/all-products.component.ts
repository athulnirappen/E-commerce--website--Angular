import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  allProducts: any = [];
  filterCategory:any
  searchkey:string=""

  constructor(private api: ApiService, private cart: CartService) {}
  ngOnInit(): void {
    this.getAllproducts();
  }

  getAllproducts() {
    this.api.getProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.data;
        this.filterCategory=res.data
        console.log(this.allProducts);
        this.allProducts.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addTocart(product: any) {
    this.cart.addtoCart(product);
  }

  filter(category:string) {
    this.filterCategory = this.allProducts.filter((a:any) => {
      if (a.category == category || category == "") {
        return a
      }
    })
  }
}
