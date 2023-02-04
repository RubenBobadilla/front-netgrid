import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
/** Auth */
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
/**import { ProfileComponent } from './components/profile/profile.component';*/

/** Profile */
import { MeComponent } from './components/profile/me/me.component';
import { RegisterComponent } from './components/profile/register/register.component';
/** Modulos */ 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'  // Para peticiones
/** Provider */
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'
import { TokenInterceptorService } from './services/token-interceptor.service';

/** Personajes */
import { PersonajesComponent } from './components/personajes/personajes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,      
    LoginComponent,
    LogoutComponent,
    MeComponent,
    RegisterComponent,
    PersonajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    // JWT
    {provide:JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    // Token Interceptor
    { provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
