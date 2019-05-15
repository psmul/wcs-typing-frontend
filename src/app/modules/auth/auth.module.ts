import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth.effects';
import {StoreModule} from '@ngrx/store';
import * as auth from './store/auth.reducers';
import {AuthService} from '../../core/services/auth.service';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', auth.reducer)
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
