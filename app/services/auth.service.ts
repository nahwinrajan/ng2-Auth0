import { Injectable }         from '@angular/core';
import { tokenNotExpired }    from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // configure Auth0
  lock = new Auth0Lock('784C4MzB4QLowAvXOKL05BmPeBGhw4Vr', 'nrajan.au.auth0.com', {});

  constructor() {
    // add callback for lock 'authenticated' event
    this.lock.on("authenticated", (authResult:any) => {
      this.lock.getProfile(authResult.idToken, (error:any, profile:any) => {
        if(error) throw new Error(error);
        localStorage.setItem('profile', JSON.stringify(profile)); //set user profile in session
        localStorage.setItem('id_token', authResult.idToken); //set user id_token in session
      })
    });
  }

  public login() {
    this.lock.show(); //display login widget by calling show method
  };

  public authenticated() {
    // check if there's an unexpired JWT
    // this searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };
}
