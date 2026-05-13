import type { ElementType } from "react";

export interface Booking {
  id: string;
  passenger: string;
  tripId: string;
  seat: string;
  amount: string;
  date: string;
  status: string;
  method: string;
}

export interface CargoItem {
  id: string;
  sender: string;
  receiver: string;
  type: string;
  wt: string;
  fee: string;
  status: string;
}

export interface BookingStat {
  label: string;
  val: string;
  icon: ElementType;
  col: string;
}
