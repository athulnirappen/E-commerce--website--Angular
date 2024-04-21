import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  product: any = [];
  grandTotal!: number;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.getProducts().subscribe((res) => {
      this.product = res;
      this.grandTotal = this.cart.getTotalPrice();
    });
  }

  removeItem(item:any){
  this.cart.removeCartItem(item)
  }

  emptyCart() {
    this.cart.removeAllCart()
  }
}
