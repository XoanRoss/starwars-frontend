import {Component, Input, Output, EventEmitter, ViewChild, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() page: number = 1;
  @Input() pageSize: number = 15;
  @Input() totalPages: number = 1;
  @Input() totalItems: number | null = null;
  @Input() error: string | null = null;
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{active: string, direction: string}>();

  columnsToDisplay: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.columnsToDisplay = this.columns.map(c => c.field);
  }

  onSortChange(event: {active: string, direction: string}) {
    this.sortChange.emit(event);
  }
}
