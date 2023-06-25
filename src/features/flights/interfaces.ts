export interface TicketTime {
    startTime: string;
    endTime: string;
  }
  
export interface Ticket {
  from: string;
  to: string;
  airline: string;
  price: number;
  currency: "USD" | "P";
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
  name: SortCriteria
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

  export interface State {
  originalFlights: Ticket[],
  shownFlights: Ticket[],
  filters: CurrentFlightOptions,
  selectedFilters: {airlines: string[], connections: number[]},
  sortCriteria: SortCriteria,
  loading: false,
  error: null,
}

  