import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {

  constructor() { }
  email: string = "";

  setemail(paramCheck: string) {
    sessionStorage.setItem("email", paramCheck);
  }

  getemail() {
    return sessionStorage.getItem("email");
  }

  clearemail() {
    return sessionStorage.removeItem("email");
  }
}
