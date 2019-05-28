import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {AuthFacadeService} from '../../store/auth-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
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
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.getRawValue();
      this.authFacade.logIn({ username, password });
    }
  }

}
