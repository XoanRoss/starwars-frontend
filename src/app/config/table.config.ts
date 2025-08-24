export interface TableColumn {
  header?: string;
  field?: string;
  sortable?: boolean;
  type?: 'text' | 'date';
}

export const TABLE_COLUMNS: TableColumn[] = [
  {header: '#', field: 'id', sortable: true, type: 'text'},
  {header: 'Name', field: 'name', sortable: true, type: 'text'},
  {header: 'Created', field: 'created', sortable: true, type: 'date'}
];
