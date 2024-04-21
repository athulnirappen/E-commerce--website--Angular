import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  addform!: FormGroup;

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

  constructor(private fb: FormBuilder, private api: ApiService) {}
  ngOnInit(): void {
    this.addform = this.fb.group({
      Id: '',
      productName: '',
      price: '',
      category: '',
      description: '',
      image: '',
    });
  }

  submit() {
    this.api.addProducts(this.addform.value).subscribe({
      next: (res: any) => {
        console.log(res);
         (async () => {
           await this.Toast.fire({
             icon: 'success',
             title: 'Product Added Successfully',
           });
         })();
        this.addform.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
