import { Routes } from '@angular/router';
import {PeopleComponent} from './pages/people/people.component';
import {PlanetsComponent} from './pages/planets/planets.component';

export const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: 'people', component: PeopleComponent },
  { path: 'planets', component: PlanetsComponent }
];
