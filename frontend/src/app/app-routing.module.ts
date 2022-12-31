import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { TourDetailsComponent } from './components/pages/tour-details/tour-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'search/:searchTerm',
    component: HomeComponent,
  },
  {
    path: 'tours/:id',
    component: TourDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
