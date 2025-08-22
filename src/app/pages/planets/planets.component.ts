import {Component, OnInit, OnDestroy} from '@angular/core';
import {TableComponent} from '../../components/table/table.component';
import {TABLE_COLUMNS} from '../../config/table.config';
import {PlanetsService} from './planets.service';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {PlanetsResponse, Planet} from './planets.model';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PlanetFilter} from '../../models/filters.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {finalize} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-planets',
  imports: [
    TableComponent,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatButton,
    MatIcon,
    MatProgressSpinnerModule,
    NgIf
  ],
  providers: [],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss'
})
export class PlanetsComponent implements OnInit, OnDestroy {
  columns = TABLE_COLUMNS;
  data: Planet[] = [];
  page = 1;
  totalPages = 1;
  sortBy = 'id';
  sortDir = 'asc';
  filter: PlanetFilter | null = null;
  nameFilter: string = '';
  createdFromFilter: Date | null = null;
  createdToFilter: Date | null = null;
  totalItems: number | null = null;
  error: string | null = null;
  pageSize: number = 15;
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private planetsService: PlanetsService) {
  }

  ngOnInit() {
    this.loadPlanets(this.page, this.sortBy, this.sortDir, this.filter);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPlanets(page: number, sortBy: string = 'id', sortDir: string = 'asc', filter: PlanetFilter | null = null) {
    this.error = null;
    this.loading = true;
    this.planetsService.getPlanets(page, sortBy, sortDir, filter)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response: PlanetsResponse) => {
          this.data = response.content;
          this.page = page;
          this.pageSize = response.size;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalElements ?? (response.totalPages * this.pageSize);
        },
        error: () => {
          this.error = 'Error cargando datos';
        }
      });
  }

  onSearch() {
    const f: PlanetFilter = {};
    if (this.nameFilter) f.name = this.nameFilter;
    if (this.createdFromFilter) f.createdFrom = this.createdFromFilter.toISOString();
    if (this.createdToFilter) f.createdTo = this.createdToFilter.toISOString();
    this.filter = Object.keys(f).length ? f : null;
    this.loadPlanets(1, this.sortBy, this.sortDir, this.filter);
  }

  clearFilters() {
    this.nameFilter = '';
    this.createdFromFilter = null;
    this.createdToFilter = null;
    this.onSearch();
  }

  onPageChange(newPage: number) {
    this.loadPlanets(newPage, this.sortBy, this.sortDir, this.filter);
  }

  onSortChange(event: { active: string, direction: string }) {
    this.sortBy = event.active;
    this.sortDir = event.direction || 'asc';
    this.loadPlanets(this.page, this.sortBy, this.sortDir, this.filter);
  }
}
