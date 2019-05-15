import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthState, selectAuthState} from '../../store/auth.states';
import {SignUp} from '../../store/auth.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  getState: Observable<any>;
  errorMessageSubscription;
  errorMessage: string | null;

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
    if(this.signupForm.valid) {
      const formValues = this.signupForm.getRawValue();

      const payload = {
        username: formValues.username,
        password: formValues.password
      };
      this.store.dispatch(new SignUp(payload));
    }
  }

}
