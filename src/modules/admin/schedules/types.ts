export interface TransitSchedule {
  id: string;
  bus: string;
  route: string;
  departure: string;
  arrival: string;
  status: string;
  occupancy: string;
  driver: string;
}

export interface TransitRoute {
  name: string;
  origin: string;
  destination: string;
  stops: number;
  distance: string;
  fare: string;
}

export interface ScheduleStat {
  label: string;
  val: string;
  icon: any;
  col: string;
}
