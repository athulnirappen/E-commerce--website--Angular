import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER_URL = 'http://localhost:8000'

  constructor(private http: HttpClient) { }
  

  register(user: any) {
    return this.http.post(`${this.SERVER_URL}/api/auth/register`,user)
    
  }

  login(user:any) {
    return this.http.post(`${this.SERVER_URL}/api/auth/login`,user)
  }

  sendEmail(email: string) {

    return this.http.post(`${this.SERVER_URL}/api/auth/send-email`, { email });
    
  }

  resetPassword(resetObj: any) {
    return this.http.post(`${this.SERVER_URL}/api/auth/reset-password`,resetObj)
  }

  getAllusers() {
    return this.http.get(`${this.SERVER_URL}/api/user/get-users`)
  }

  deleteuser(id: any) {
    return this.http.delete(`${this.SERVER_URL}/api/user/delete-user/${id}`)
    
  }

  addProducts(data: any) {
    return this.http.post(`${this.SERVER_URL}/api/product/add-product`,data)
  }

  getProducts() {
    return this.http.get(`${this.SERVER_URL}/api/product/get-products`)
  }

  getsingleproduct(id:any) {
    return this.http.get(`${this.SERVER_URL}/api/product/get-single-product/${id}`)
    
  }

  updateProduct(id: any, data: any) {
    return this.http.put(`${this.SERVER_URL}/api/product/edit-product/${id}`,data)
  }
  deleteProduct(id: any) {
    return this.http.delete(`${this.SERVER_URL}/api/product/delete-product/${id}`)
    
  }
}
