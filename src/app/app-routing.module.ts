import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'admin',canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  {path: 'account',canActivate: [AuthGuard], loadChildren: () => import('./account/account.module').then( m => m.AccountModule)},
  {path: 'offers', loadChildren: () => import('./offers/offers.module').then( m => m.OffersModule)},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
