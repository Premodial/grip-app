import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from '../user/user.service';

/**
 * AuthGuard is an Angular guard service that implements the CanActivate interface
 * to control navigation to routes based on the user's authentication status.
 * It leverages the UserService to check if a user is logged in and decides
 * whether to allow navigation to a route.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Constructs the AuthGuard with necessary dependencies.
   * @param {UserService} userService Service to manage user authentication state.
   * @param {Router} router Angular Router for navigation control.
   */
  constructor(private userService: UserService, private router: Router) {}

  /**
   * Determines if a route can be activated based on the user's login status.
   * If the user is not logged in, it redirects to the login page and prevents
   * route activation by returning false. If the user is logged in, it allows
   * route activation by returning true.
   * 
   * The observable pipeline ensures this check is performed efficiently and
   * reactively, making a single check (`take(1)`) before making a routing decision.
   * 
   * @returns {Observable<boolean>} An observable that emits true if the route can
   * be activated (user is logged in), or false if not (user is not logged in).
   */
  canActivate(): Observable<boolean> {
    return this.userService.isLoggedIn().pipe(
      take(1), // Ensures the subscription completes after checking the login state once.
      map(isLoggedIn => {
        if (!isLoggedIn) {
          // If not logged in, redirect to the login page and prevent route activation.
          this.router.navigate(['/login']);
          return false;
        }
        // Allow route activation if logged in.
        return true;
      })
    );
  }
}
