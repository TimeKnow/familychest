import {FamilyState, initialFamilyState} from '../state/family.state';
import {FamilyActions, FamilyActionsTypes} from '../actions/family.actions';

export function familyReducers(state: FamilyState = initialFamilyState, action: FamilyActions) {
  switch (action.type) {
    case FamilyActionsTypes.SelectCurrentFamily:
      return {
        ...state,
        currentFamily: action.payload
      };
    case FamilyActionsTypes.GetFamilies:
      return {
        ...state,
        loading: true
      };
    case FamilyActionsTypes.GetFamiliesSuccess:
      return {
        ...state,
        loading: false,
        families: action.payload
      };
    case FamilyActionsTypes.GetFamilyMembers:
      return {
        ...state,
        loading: true
      };
    case FamilyActionsTypes.GetFamilyMembersSuccess:
      return {
        ...state,
        loading: false,
        familyMembers: action.payload
      };
    case FamilyActionsTypes.GenerateCodeForChild:
      return {
        ...state,
        loading: true,
      };
    case FamilyActionsTypes.GenerateCodeForChildSuccess:
      return {
        ...state,
        loading: false,
        generatedCode: action.payload
      };
    case FamilyActionsTypes.AddMemberToFamily:
      return {
        ...state,
        loading: false
      };
    case FamilyActionsTypes.AddMemberToFamilySuccess:
      return {
        ...state,
        loading: true
      };
    case FamilyActionsTypes.CreateFamily:
      return {
        ...state,
        loading: false
      };
    case FamilyActionsTypes.CreateFamilySuccess:
      return {
        ...state,
        loading: true,
        families: state.families.concat([action.payload])
      };
    case FamilyActionsTypes.GetAvailableUserForFamily:
      return {
        ...state,
        loading: true,
      };
    case FamilyActionsTypes.GetAvailableUserForFamilySuccess:
      return {
        ...state,
        loading: false,
        availableUsersForFamily: action.payload
      };
    case FamilyActionsTypes.GetFamilyChildRequests:
      return {
        ...state,
        loading: true
      };
    case FamilyActionsTypes.GetFamilyChildRequestsSuccess:
      return {
        ...state,
        loading: false,
        childRequests: action.payload
      };
    default:
      return state;
  }
}
