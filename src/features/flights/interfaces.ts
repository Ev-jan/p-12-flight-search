import {  EntityState } from "@reduxjs/toolkit";


export interface TicketTime {
    startTime: string;
    endTime: string;
  }

enum Currency {
  USD = "USD",
  RUB = "P"
}
  
export interface Ticket {
  from: string;
  to: string;
  airline: string;
  price: number;
  currency: Currency;
  startTime: string;
  endTime: string;
  duration: string;
  connections: number;
  id: number;
}
  
export interface OptionFilter {
  [key: string]: string | number | boolean;
  selected: boolean;
}

export type FlightOptions<Ticket> = {
  [Property in keyof Ticket] : OptionFilter[]
}

export type CurrentFlightOptions = Pick<FlightOptions<Ticket>, "airline" | "connections">; 

export interface SortPayload {
  criterion: SortCriteria
}

export interface WeightedFlight {
  flight: Ticket;
  score: number;
}

export enum SortCriteria {
  fastest = "fastest",
  cheapest = "cheapest",
  optimal = "optimal",
}

export interface State extends EntityState<Ticket> {
  filters: CurrentFlightOptions;
  filteredFlights: Ticket[];
  selectedFilters: { airlines: string[]; connections: number[] };
  sortCriteria: SortCriteria;
  loading: boolean;
  error: null;
}

