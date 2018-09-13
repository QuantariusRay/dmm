import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';
import { Observable } from 'rxjs/index';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<firebase.User>;

  constructor(private router: Router,
              private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  signup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {

    });
  }

  emailLogin(data) {
    this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
      .then(_ => this.router.navigate(['']))
      .catch(error => console.log(`auth error`, error));
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => this.router.navigate(['home']))
      .catch(error => console.log(`auth error`, error));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/home']);
  }

}
