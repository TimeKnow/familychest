import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {FamilyState} from '../state/family.state';

const selectFamilyState = (state: AppState) => state.familyState;

export const selectCurrentSelectedFamily = createSelector(
  selectFamilyState,
  (state: FamilyState) => state.currentFamily
);

export const selectFamilyStateIsLoading = createSelector(
  selectFamilyState,
  (state: FamilyState) => state.loading
);

export const selectFamilies = createSelector(
  selectFamilyState,
  (state: FamilyState) => state.families
);

export const selectFamilyAvailableUsers = createSelector(
  selectFamilyState,
  (state: FamilyState) => state.availableUsersForFamily
);

export const selectFamilyMembers = createSelector(
  selectFamilyState,
  (state: FamilyState) => state.familyMembers
);

export const selectFamilyStateGeneratedCode = createSelector(
  selectFamilyState,
  (state: FamilyState) => state.generatedCode
);

export const selectFamilyStateChildRequests = createSelector(
  selectFamilyState,
  (state: FamilyState) => state.childRequests
);
