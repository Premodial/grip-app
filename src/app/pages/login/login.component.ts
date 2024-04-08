
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { ToastService } from 'src/app/core/feedback/toast.service';
import {
  LOGIN_SUCCESS_MESSAGE,
  LOGIN_SUCCESS_TITLE,
  LOGIN_FAILURE_MESSAGE,
  LOGIN_FAILURE_TITLE,
  LOGIN_VALIDATION_ERROR_MESSAGE,
  LOGIN_VALIDATION_ERROR_TITLE,
} from 'src/app/constants/messages';

/**
 * LoginComponent is responsible for handling the user login process.
 * It creates and validates the login form, interacts with the UserService
 * for authentication, and handles navigation based on the authentication result.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  /**
   * Constructs the LoginComponent, initializing form builders,
   * services, and routers required for login functionality.
   * @param {FormBuilder} fb Provides the capabilities to generate complex forms.
   * @param {UserService} userService Manages user authentication operations.
   * @param {Router} router Enables navigation to different routes within the application.
   */
  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * ngOnInit lifecycle hook for additional initialization tasks.
   * Currently, this method does not perform any specific operations.
   */
  ngOnInit() {}


  /**
   * Handles the login form submission. Attempts to authenticate the user using
   * the UserService with the provided email and password. Upon successful authentication,
   * navigates to the home route. If authentication fails, it handles the error by logging it.
   */
  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.loginWithEmail(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.toastService.showSuccess(LOGIN_SUCCESS_MESSAGE, LOGIN_SUCCESS_TITLE);
        },
        error: (error) => {
          this.toastService.showError(LOGIN_FAILURE_MESSAGE, LOGIN_FAILURE_TITLE);
          console.error('Login error', error);
        }
      });
    } else {
      this.toastService.showError(LOGIN_VALIDATION_ERROR_MESSAGE, LOGIN_VALIDATION_ERROR_TITLE);
    }
  }
}
