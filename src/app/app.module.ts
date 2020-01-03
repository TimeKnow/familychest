import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {appReducers} from './store/reducers/app.reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import appEffects from './store/effects/app.effects';
import {LoginFormComponent} from './components/auth/login-form/login-form.component';
import {RegisterParentFormComponent} from './components/auth/register-parent-form/register-parent-form.component';
import {RegisterChildFormComponent} from './components/auth/register-child-form/register-child-form.component';
import {RegisterPageComponent} from './containers/auth/register-page/register-page.component';
import {LoginPageComponent} from './containers/auth/login-page/login-page.component';
import {MenuHandlerComponent} from './shared/containers/menu-handler/menu-handler.component';
import {MenuDisplayComponent} from './shared/components/menu-display/menu-display.component';
import {LoadingDisplayComponent} from './shared/components/loading-display/loading-display.component';
import {MatRadioModule} from '@angular/material';
import {BackendInterceptor} from './backend/backend.interceptor';
import {HomePageComponent} from './containers/home/home-page/home-page.component';
import {CardButtonComponent} from './shared/components/card-button/card-button.component';
import {ChildHomeViewComponent} from './components/home/child-home-view/child-home-view.component';
import {ParentHomeViewComponent} from './components/home/parent-home-view/parent-home-view.component';
import {ChildCreationFormComponent} from './components/family/child-creation-form/child-creation-form.component';
import {AddFamilyMemberFormComponent} from './components/family/add-family-member-form/add-family-member-form.component';
import {FamilyMembersTableComponent} from './components/family/family-members-table/family-members-table.component';
import {FamilyCreationFormComponent} from './components/family/family-creation-form/family-creation-form.component';
import {CreateFamilyPageComponent} from './containers/family/create-family-page/create-family-page.component';
import {CreateChildAccountPageComponent} from './containers/family/create-child-account-page/create-child-account-page.component';
import {AddFamilyMemberPageComponent} from './containers/family/add-family-member-page/add-family-member-page.component';
import {FamilyListPageComponent} from './containers/family/family-list-page/family-list-page.component';
import {FamilySelectorComponent} from './shared/containers/family-selector/family-selector.component';
import {ChildRequestsDashboardTableComponent} from './components/family/child-requests-dashboard-table/child-requests-dashboard-table.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ChildRequestsDashboardPageComponent} from './containers/family/child-requests-dashboard-page/child-requests-dashboard-page.component';
import {ChildRequestHeaderComponent} from './components/family/child-request-header/child-request-header.component';
import {FamilyFinancialTableComponent} from './components/finance/family-financial-table/family-financial-table.component';
import {FamilyFinancialTablePageComponent} from './containers/finance/family-financial-table-page/family-financial-table-page.component';
import {PersonalFinancialTableComponent} from './components/finance/personal-financial-table/personal-financial-table.component';
import {PersonalFinancialTablePageComponent} from './containers/finance/personal-financial-table-page/personal-financial-table-page.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {FinancialStatisticsChartsComponent} from './components/finance/financial-statistics-charts/financial-statistics-charts.component';
import {FinancialStatisticsChartsPageComponent} from './containers/finance/financial-statistics-charts-page/financial-statistics-charts-page.component';
import {StatisticsChartFilterOptionsComponent} from './components/finance/statistics-chart-filter-options/statistics-chart-filter-options.component';
import {FinancialStatementFormComponent} from './components/finance/financial-statement-form/financial-statement-form.component';
import {QuillModule} from 'ngx-quill';
import {NgxFileDropModule} from 'ngx-file-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CreateFinancialStatementPageComponent } from './containers/finance/create-financial-statement-page/create-financial-statement-page.component';
import { CreateChildRequestFormComponent } from './components/family/create-child-request-form/create-child-request-form.component';
import { CreateChildRequestPageComponent } from './containers/family/create-child-request-page/create-child-request-page.component';
import { ForumPostHeaderComponent } from './components/forum/forum-post-header/forum-post-header.component';
import { ForumPostTableComponent } from './components/forum/forum-post-table/forum-post-table.component';
import { ForumPostViewComponent } from './components/forum/forum-post-view/forum-post-view.component';
import { CreateForumPostFormComponent } from './components/forum/create-forum-post-form/create-forum-post-form.component';
import { CreateForumAnswerFormComponent } from './components/forum/create-forum-answer-form/create-forum-answer-form.component';
import { CreateForumResourceFormComponent } from './components/forum/create-forum-resource-form/create-forum-resource-form.component';
import { ForumResourcesTableComponent } from './components/forum/forum-resources-table/forum-resources-table.component';
import { ForumPostsPageComponent } from './containers/forum/forum-posts-page/forum-posts-page.component';
import { ForumSelectedPostPageComponent } from './containers/forum/forum-selected-post-page/forum-selected-post-page.component';
import { ForumResourcesPageComponent } from './containers/forum/forum-resources-page/forum-resources-page.component';
import { CreateForumPostPageComponent } from './containers/forum/create-forum-post-page/create-forum-post-page.component';
import { CreateForumAnswerPageComponent } from './containers/forum/create-forum-answer-page/create-forum-answer-page.component';
import { CreateForumResourcePageComponent } from './containers/forum/create-forum-resource-page/create-forum-resource-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterParentFormComponent,
    RegisterChildFormComponent,
    RegisterPageComponent,
    LoginPageComponent,
    MenuHandlerComponent,
    MenuDisplayComponent,
    LoadingDisplayComponent,
    HomePageComponent,
    CardButtonComponent,
    ChildHomeViewComponent,
    ParentHomeViewComponent,
    ChildCreationFormComponent,
    AddFamilyMemberFormComponent,
    FamilyMembersTableComponent,
    FamilyCreationFormComponent,
    CreateFamilyPageComponent,
    CreateChildAccountPageComponent,
    AddFamilyMemberPageComponent,
    FamilyListPageComponent,
    FamilySelectorComponent,
    ChildRequestsDashboardTableComponent,
    ChildRequestsDashboardPageComponent,
    ChildRequestHeaderComponent,
    FamilyFinancialTableComponent,
    FamilyFinancialTablePageComponent,
    PersonalFinancialTableComponent,
    PersonalFinancialTablePageComponent,
    FinancialStatisticsChartsComponent,
    FinancialStatisticsChartsPageComponent,
    StatisticsChartFilterOptionsComponent,
    FinancialStatementFormComponent,
    CreateFinancialStatementPageComponent,
    CreateChildRequestFormComponent,
    CreateChildRequestPageComponent,
    ForumPostHeaderComponent,
    ForumPostTableComponent,
    ForumPostViewComponent,
    CreateForumPostFormComponent,
    CreateForumAnswerFormComponent,
    CreateForumResourceFormComponent,
    ForumResourcesTableComponent,
    ForumPostsPageComponent,
    ForumSelectedPostPageComponent,
    ForumResourcesPageComponent,
    CreateForumPostPageComponent,
    CreateForumAnswerPageComponent,
    CreateForumResourcePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatInputModule, MatFormFieldModule, MatCardModule, MatTableModule, MatButtonModule, MatCheckboxModule,
    MatDividerModule, MatIconModule, MatGridListModule, MatListModule, MatSidenavModule, MatDialogModule,
    MatToolbarModule, MatDatepickerModule, MatSelectModule, FormsModule, MatRadioModule,
    MatNativeDateModule, MatExpansionModule, MatStepperModule, MatChipsModule, MatBadgeModule,
    MatAutocompleteModule, MatProgressSpinnerModule, MatMenuModule, MatTabsModule, MatTreeModule, StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    InfiniteScrollModule, GoogleChartsModule,
    QuillModule.forRoot(), NgxFileDropModule, DragDropModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
