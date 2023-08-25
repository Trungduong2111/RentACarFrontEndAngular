import { Injectable } from '@angular/core';
import { LocalStorageServiceService } from './local-storage-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginModel } from '../models/loginmodel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl = "https://localhost:44388/api/auth/";
  token: any;
  name: string = "";
  surname: string = "";
  roles: any[] = [];
  role: any;
  userId!: number;
  email!: string;
  userName: string = "";

  constructor(private localStorage: LocalStorageServiceService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private httpClient: HttpClient) { }

  isAuthenticated() {
    if (this.localStorage.getItem("token")) {
      return true;
    }
    else {
      return false
    }
  }

  userDetailFromToken() {
    this.token = this.localStorage.getItem("token");
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.name = name.split(' ')[0];
    let surname = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.surname = surname.split(' ')[1];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    this.email = decodedToken["email"];
    this.userName = name.split(' ')[0] + " " + surname.split(' ')[1];

  };

  logout() {
    this.localStorage.clear()
    this.onRefresh();
    this.router.navigate(['/login']);
  };

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  };

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }

}
