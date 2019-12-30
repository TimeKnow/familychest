import {AuthEffects} from './auth.effects';
import {HttpErrorsEffects} from './http-errors.effects';
import {FamilyEffects} from './family.effects';

const appEffects = [AuthEffects, HttpErrorsEffects, FamilyEffects];
export default appEffects;
