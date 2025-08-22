import {Component, OnInit, OnDestroy} from '@angular/core';
import {TableComponent} from '../../components/table/table.component';
import {TABLE_COLUMNS} from '../../config/table.config';
import {PeopleService} from './people.service';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {PeopleResponse, Person} from './people.model';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PeopleFilter} from '../../models/filters.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {finalize} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-people',
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
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent implements OnInit, OnDestroy {
  columns = TABLE_COLUMNS;
  data: Person[] = [];
  page = 1;
  totalPages = 1;
  sortBy = 'id';
  sortDir = 'asc';
  filter: PeopleFilter | null = null;
  nameFilter: string = '';
  createdFromFilter: Date | null = null;
  createdToFilter: Date | null = null;
  totalItems: number | null = null;
  error: string | null = null;
  pageSize: number = 15;
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.loadPeople(this.page, this.sortBy, this.sortDir, this.filter);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPeople(page: number, sortBy: string = 'id', sortDir: string = 'asc', filter: any = null) {
    this.error = null;
    this.loading = true;
    this.peopleService.getPeople(page, sortBy, sortDir, filter)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response: PeopleResponse) => {
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
    const filter: PeopleFilter = {};
    if (this.nameFilter) filter.name = this.nameFilter;
    if (this.createdFromFilter) filter.createdFrom = this.createdFromFilter.toISOString();
    if (this.createdToFilter) filter.createdTo = this.createdToFilter.toISOString();
    this.filter = Object.keys(filter).length ? filter : null;
    this.loadPeople(1, this.sortBy, this.sortDir, this.filter);
  }

  clearFilters() {
    this.nameFilter = '';
    this.createdFromFilter = null;
    this.createdToFilter = null;
    this.onSearch();
  }

  onPageChange(newPage: number) {
    this.loadPeople(newPage, this.sortBy, this.sortDir, this.filter);
  }

  onSortChange(event: { active: string, direction: string }) {
    this.sortBy = event.active;
    this.sortDir = event.direction || 'asc';
    this.loadPeople(this.page, this.sortBy, this.sortDir, this.filter);
  }
}
