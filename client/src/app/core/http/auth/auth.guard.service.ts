import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from "../../../shared/services/storage/storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const data = this.storageService.getStorage("userData");
    if (data && data.token) {
      return true;
    } else {
      this.router.navigate(["/public"]);
      return false;
    }
  }
  constructor(private router: Router, private storageService: StorageService) {}
}
