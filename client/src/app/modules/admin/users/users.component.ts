import { Component, OnInit } from '@angular/core';
import { userSchema } from '../usermodel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  allUsers: any = [];
  searchkey: string = '';
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getusers();
  }

  getusers() {
    this.api.getAllusers().subscribe({
      next: (res: any) => {
        this.allUsers = res.data;
        console.log(this.allUsers);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  delete(id: any) {
    this.api.deleteuser(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getusers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
