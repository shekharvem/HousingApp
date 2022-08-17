import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PropertyComponent } from './property/property.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { PropertyListService } from './services/property.service';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SearchComponent } from './search/search.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropertyDetailResolver } from './resolvers/propertydetail.resolver';
import { ErrorMessagesService } from './services/error-messages.service';
import { FooterComponent } from './footer/footer.component';
import { AuthInterceptor } from './auth.interceptor';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { SortPipe } from './pipes/filter/sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PropertyComponent,
    PropertyListComponent,
    PropertyCardComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    SearchComponent,
    FooterComponent,
    SearchResultsComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [PropertyListService, UserService, AlertService, AuthService, PropertyDetailResolver, ErrorMessagesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
