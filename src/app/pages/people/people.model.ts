export interface PeopleResponse {
  content: Person[];
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface Person {
  id: number;
  name: string;
  created: string;
}
