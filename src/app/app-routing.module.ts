import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailResolver } from './resolvers/propertydetail.resolver';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AuthGuard } from './user/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes =  [
  { path: '', component: PropertyListComponent },
  { path: 'rent-property', component: PropertyListComponent },
  { path: 'buy-property', component: PropertyListComponent },
  { path: 'add-property', component: AddPropertyComponent, canActivate: [AuthGuard]},
  { path: 'property-detail/:id', component: PropertyDetailComponent, resolve: { prop : PropertyDetailResolver}},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'search-results', component: SearchResultsComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
