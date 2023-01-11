import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { FormsModule } from '@angular/forms';
import { TourDetailsComponent } from './components/pages/tour-details/tour-details.component';
import { MapComponent } from './components/pages/map/map.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginFormComponent } from './components/partials/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { EmailModalComponent } from './components/partials/email-modal/email-modal.component';
import { ResetPasswordModalComponent } from './components/partials/reset-password-modal/reset-password-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TourDetailsComponent,
    MapComponent,
    LoginComponent,
    LoginFormComponent,
    DashboardComponent,
    CartPageComponent,
    EmailModalComponent,
    ResetPasswordModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
