import {AuthEffects} from './auth.effects';
import {HttpErrorsEffects} from './http-errors.effects';
import {FamilyEffects} from './family.effects';
import {FinancialEffects} from './financial.effects';
import {ForumEffects} from './forum.effects';

const appEffects = [AuthEffects, HttpErrorsEffects, FamilyEffects, FinancialEffects, ForumEffects];
export default appEffects;
