import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthState, selectAuthState} from '../../store/auth.states';
import {LogIn} from '../../store/auth.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  getState: Observable<any>;
  errorMessageSubscription;
  errorMessage: string | null;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.errorMessageSubscription = this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  ngOnDestroy() {
    this.errorMessageSubscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.getRawValue();

      const payload = {
        username: formValues.username,
        password: formValues.password
      };
      this.store.dispatch(new LogIn(payload));
    }
  }

}
