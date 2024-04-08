import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, mapTo, tap, map } from 'rxjs/operators';

/**
 * UserService provides authentication-related functionalities, leveraging Firebase
 * authentication for operations such as login and session management. It offers
 * methods to check user's login status and to perform login operations.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Constructs the UserService with necessary dependencies.
   * @param {AngularFireAuth} afAuth Firebase Authentication service for auth operations.
   * @param {Router} router Angular Router for navigation post-authentication.
   */
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  /**
   * Checks if the user is currently logged in by observing the authentication state.
   * @returns {Observable<boolean>} An observable emitting true if the user is logged in, false otherwise.
   */
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user: firebase.default.User | null) => !!user)
    );
  }

  /**
   * Performs the login operation using the provided email and password. Upon successful
   * authentication, navigates to the home page. In case of an error, it logs the error
   * and rethrows it for further handling.
   * 
   * @param {string} email User's email address.
   * @param {string} password User's password.
   * @returns {Observable<void>} An observable that completes upon the completion of the login operation.
   */
  loginWithEmail(email: string, password: string): Observable<void> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => this.router.navigate(['/'])), // Navigate on success
      mapTo(void 0), // Ensures the observable completes without emitting a value
      catchError(error => {
        console.error('Login Failed', error); // Log the error
        throw error; // Rethrow for external handling
      })
    );
  }

  /**
   * Logs out the current user. Upon successful logout, navigates to the login page.
   * In case of an error, it logs the error and rethrows it for further handling.
   * 
   * @returns {Observable<void>} An observable that completes upon the completion of the logout operation.
   */
  logout(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(
      tap(() => this.router.navigate(['/login'])), // Navigate to login on success
      mapTo(void 0), // Ensures the observable completes without emitting a value
      catchError(error => {
        console.error('Logout Failed', error); // Log the error
        throw error; // Rethrow for external handling
      })
    );
  }
  
}

