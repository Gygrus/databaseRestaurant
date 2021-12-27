import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./master-parent/home/home.component";
import {DishesComponent} from "./master-parent/dishes/dishes.component";
import {DishDetailsComponent} from "./master-parent/dishes/dish-details/dish-details.component";
import {AddItemComponent} from "./master-parent/header/add-item/add-item.component";
import {ShopListComponent} from "./master-parent/shop-list/shop-list.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: DishesComponent,
    children: [
      {path: "dish-item/:name", component: DishDetailsComponent}
    ] },
  { path: 'new-dish', component: AddItemComponent },
  { path: 'shop-list', component: ShopListComponent },
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
