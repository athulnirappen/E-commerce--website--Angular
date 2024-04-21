import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { SingleproductComponent } from './singleproduct/singleproduct.component';

const routes: Routes = [
  {
  path:"" ,component:LoginComponent
  },
  {
    path: "register",
    component:RegisterComponent
  },
  {
    path: "home",
    component:HomeComponent
  },
  {
    path: "cart",
    component:CartComponent
    
  },
  {
    path: "forget-password",
    component:ForgetPasswordComponent

  },
  {
    path: "reset/:token",
    component:ResetComponent

  },
  {
    path: "all-products",
    component:AllProductsComponent
  },
  {
    path: "singleproduct/:id",
    component:SingleproductComponent
  },

  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
