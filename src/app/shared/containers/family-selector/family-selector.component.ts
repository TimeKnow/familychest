import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Family} from '../../../core/models/family/family.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentSelectedFamily, selectFamilies} from '../../../store/selectors/family.selectors';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GetFamilies, SelectCurrentFamily} from '../../../store/actions/family.actions';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-family-selector',
  templateUrl: './family-selector.component.html',
  styleUrls: ['./family-selector.component.css']
})
export class FamilySelectorComponent implements OnInit {
  families$: Observable<Family[]>;
  form: FormGroup;

  constructor(private store: Store<AppState>) {
    this.form = new FormGroup({
      selectedFamily: new FormControl(null)
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetFamilies());
    this.families$ = this.store.select(selectFamilies);
    this.store.select(selectCurrentSelectedFamily).pipe(
      filter(familyId => !!familyId),
      tap(familyId => this.form.patchValue({selectedFamily: familyId}))
    );

    this.form.get('selectedFamily').valueChanges.subscribe(value => {
      this.store.dispatch(new SelectCurrentFamily(value));
    });
  }
}
