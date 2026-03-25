export interface TransitRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: string;
  stops: number;
  status: 'Active' | 'Inactive' | 'Under Review';
}

export interface RouteStop {
  id: string;
  name: string;
  location: string;
}
