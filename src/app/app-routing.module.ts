import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { PageNotFoundComponent} from './Components/page-not-found/page-not-found.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:token', component: ResetpasswordComponent },
  //{ path: '**', component: PageNotFoundComponent },
  { path: 'dashboard', component:DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
