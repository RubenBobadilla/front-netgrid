import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'  // Para peticiones

import { PersonajesRoutingModule } from './personajes-routing.module';
import { IndexComponent } from './index/index.component';

/** Provider */
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    PersonajesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [    
    // Token Interceptor
    { provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true }
  ]
})
export class PersonajesModule { }
