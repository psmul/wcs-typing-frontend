import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AuthFacadeService} from '../../store/auth-facade.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  authErrorMessage$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacadeService
  ) {
    this.authErrorMessage$ = this.authFacade.getAuthErrorMessage();
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const {username, password} = this.signupForm.getRawValue();
      this.authFacade.signUp({ username, password });
    }
  }

}
