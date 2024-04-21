import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { UsersComponent } from './users/users.component';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { Graph1Component } from './graph1/graph1.component';
import { Graph2Component } from './graph2/graph2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersPipe } from './transform/users.pipe';
import { ProductsPipe } from './transform/products.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AddproductComponent,
    EditproductComponent,
    UsersComponent,
    AdminproductsComponent,
    MainNavComponent,
    AdminContentComponent,
    Graph1Component,
    Graph2Component,
    UsersPipe,
    ProductsPipe,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
