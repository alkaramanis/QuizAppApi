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
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { EmailModalComponent } from './components/partials/email-modal/email-modal.component';
import { ResetPasswordModalComponent } from './components/partials/reset-password-modal/reset-password-modal.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { ReviewsComponent } from './components/partials/reviews/reviews.component';
import { RatingModule } from 'ng-starrating';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TourDetailsComponent,
    MapComponent,
    LoginComponent,
    DashboardComponent,
    CartPageComponent,
    EmailModalComponent,
    ResetPasswordModalComponent,
    NotFoundComponent,
    ReviewsComponent,
    MyProfileComponent,
    InputContainerComponent,
    SignupComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
