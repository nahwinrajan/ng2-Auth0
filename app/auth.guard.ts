import { Injectable }   from '@angular/core';
import { Router, CanActivate} from '@angular/router';

import { Auth } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private auth: Auth, private router: Router) {

  }

  canActivate() {
    if(this.auth.authenticated()) {
      console.log('user has been authenticated');
      return true;
    } else {
      console.log('un-authenticated user, permission denied');
      this.router.navigate(['/']);
      return false;
    }
  }
}
