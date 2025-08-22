export interface PlanetsResponse {
  content: Planet[];
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface Planet {
  id: number;
  name: string;
  created: string;
}
