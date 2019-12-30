import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {filter, map, take} from 'rxjs/operators';
import {GetCurrentUser} from '../../store/actions/auth.actions';
import {selectCurrentAuthUser} from '../../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(new GetCurrentUser(true));
    return this.store.pipe(
      select(selectCurrentAuthUser),
      filter(user => !!user),
      map((user) => {
        if (route.data) {
          if (!route.data.roles.includes(user.role)) {
            this.router.navigateByUrl('/login').then(x => {});
            return false;
          }
        }
        return true;
      }),
      take(1)
    );
  }

}
