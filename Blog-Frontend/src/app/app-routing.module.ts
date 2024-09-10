import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CanActivateService } from './guards/can-activate.service';
import { ViewPostComponent } from './components/view-post/view-post.component';

const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: LandingComponent },
  { path: 'register-page', component: RegisterComponent },
  { path: 'login-page', component: LoginComponent },
  { path: 'post/:id', component: ViewPostComponent},
  {path:'dashboard', component:DashboardComponent, canActivate: [CanActivateService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
