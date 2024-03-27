import { Injectable } from '@angular/core';
import {   Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteURL } from '../enum/route.enum';

@Injectable({ providedIn: 'root' })
export class PicturesViewGuard   {

  private hasVisitedPicturesView = false; // Flag to track visitation

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.hasVisitedPicturesView) {
      // Allow access if picturesView has been visited
      return true;
    }

    // Redirect to picturesView if not visited yet
    this.router.navigate([RouteURL.picutresView]);
    return false;
  }

  markPicturesViewVisited() {
    this.hasVisitedPicturesView = true;
  }
}