import { AdminproductsComponent } from './adminproducts/adminproducts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { EditproductComponent } from './editproduct/editproduct.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: AdminproductsComponent },
  { path: 'users', component: UsersComponent },
  {path:'edit-product/:id',component:EditproductComponent}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
