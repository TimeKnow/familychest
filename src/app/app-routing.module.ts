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
import {FamilyFinancialTablePageComponent} from './containers/finance/family-financial-table-page/family-financial-table-page.component';
import {PersonalFinancialTablePageComponent} from './containers/finance/personal-financial-table-page/personal-financial-table-page.component';
import {FinancialStatisticsChartsPageComponent} from './containers/finance/financial-statistics-charts-page/financial-statistics-charts-page.component';
import {CreateFinancialStatementPageComponent} from './containers/finance/create-financial-statement-page/create-financial-statement-page.component';
import {CreateChildRequestPageComponent} from './containers/family/create-child-request-page/create-child-request-page.component';
import {ForumPostsPageComponent} from './containers/forum/forum-posts-page/forum-posts-page.component';
import {ForumSelectedPostPageComponent} from './containers/forum/forum-selected-post-page/forum-selected-post-page.component';
import {ForumResourcesPageComponent} from './containers/forum/forum-resources-page/forum-resources-page.component';
import {CreateForumPostPageComponent} from './containers/forum/create-forum-post-page/create-forum-post-page.component';
import {CreateForumAnswerPageComponent} from './containers/forum/create-forum-answer-page/create-forum-answer-page.component';
import {CreateForumResourcePageComponent} from './containers/forum/create-forum-resource-page/create-forum-resource-page.component';


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
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'family/child-requests/create',
    component: CreateChildRequestPageComponent,
    canActivate: [AuthGuard],
    data: {roles: [AuthUserRoles.Admin, AuthUserRoles.Child]}
  },
  {
    path: 'finance/family-members',
    component: FamilyFinancialTablePageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'finance/personal',
    component: PersonalFinancialTablePageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'finance/statistics',
    component: FinancialStatisticsChartsPageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'finance/create',
    component: CreateFinancialStatementPageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'forum',
    component: ForumPostsPageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'forum/resources/create',
    component: CreateForumResourcePageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'forum/resources',
    component: ForumResourcesPageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'forum/create',
    component: CreateForumPostPageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'forum/:id/create',
    component: CreateForumAnswerPageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
  {
    path: 'forum/:id',
    component: ForumSelectedPostPageComponent,
    canActivate: [AuthGuard],
    data: {roles: AuthUserRolesArray}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
