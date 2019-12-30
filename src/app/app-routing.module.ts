import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './containers/auth/login-page/login-page.component';
import {RegisterPageComponent} from './containers/auth/register-page/register-page.component';
import {HomePageComponent} from './containers/home/home-page/home-page.component';
import {AuthGuard} from './core/guards/auth.guard';
import {AuthUserRoles, AuthUserRolesArray} from './core/models/auth/auth-user-roles';
import {CreateFamilyPageComponent} from './containers/family/create-family-page/create-family-page.component';
import {CreateChildAccountPageComponent} from './containers/family/create-child-account-page/create-child-account-page.component';
import {AddFamilyMemberPageComponent} from './containers/family/add-family-member-page/add-family-member-page.component';
import {FamilyListPageComponent} from './containers/family/family-list-page/family-list-page.component';
import {ChildRequestsDashboardPageComponent} from './containers/family/child-requests-dashboard-page/child-requests-dashboard-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard], data: {roles: AuthUserRolesArray}},
  {path: 'family', component: CreateFamilyPageComponent, canActivate: [AuthGuard], data: {roles: AuthUserRolesArray}},
  {
    path: 'family/create-child-account',
    component: CreateChildAccountPageComponent,
    canActivate: [AuthGuard],
    data: {roles: [AuthUserRoles.Parent, AuthUserRoles.Admin]}
  },
  {
    path: 'family/add-member',
    component: AddFamilyMemberPageComponent,
    canActivate: [AuthGuard],
    data: {roles: [AuthUserRoles.Parent, AuthUserRoles.Admin]}
  },
  {
    path: 'family/members',
    component: FamilyListPageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'family/child-requests',
    component: ChildRequestsDashboardPageComponent,
    canActivate: [AuthGuard],
    data: {roles: [AuthUserRoles.Parent, AuthUserRoles.Admin]}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
