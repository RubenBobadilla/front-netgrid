import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/**import { AuthComponent } from './components/auth/auth.component'; */

/** Auth */
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RegisterComponent } from './components/profile/register/register.component';
import { HomeComponent } from './components/home/home.component';
/** Profile */
import { MeComponent } from './components/profile/me/me.component';
import { ProfileComponent } from './components/profile/profile.component';

/** Personajes */
import { PersonajesComponent } from './components/personajes/personajes.component';

/** GUARDS */
//-- Guard - Auth:
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate:[AuthGuard]
  },
  /** Auth */
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  /** Principal */
  {
    path: 'home', component: HomeComponent,
    canActivate:[AuthGuard]
  },  
  /** Profile */
  {
    path: 'me', component: MeComponent
  },
  {
    path: 'register', component: RegisterComponent
  },  
  {
    path: 'profile', component: ProfileComponent,
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule)
  },
  /** Personajes */
  {
    path: 'personajes', component: PersonajesComponent,
    loadChildren: () => import('./components/personajes/personajes.module').then(m => m.PersonajesModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
