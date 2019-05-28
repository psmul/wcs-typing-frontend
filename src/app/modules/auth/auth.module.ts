import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './views/login/login.component';
import {SignupComponent} from './views/signup/signup.component';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth.effects';
import {StoreModule} from '@ngrx/store';
import {AuthService} from '../../core/services/auth.service';
import {authReducer} from './store/auth.reducers';
import {AuthFacadeService} from './store/auth-facade.service';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', authReducer)
  ],
  providers: [
    AuthService,
    AuthFacadeService
  ]
})
export class AuthModule {
}
