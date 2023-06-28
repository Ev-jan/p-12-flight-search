import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  SortCriteria,
  State,
  Ticket,
  OptionFilter,
} from "./interfaces";

import {
  updateFilterSelections,
  updateFilterOptions,
  sortWithCurrCriteria,
} from "./helpers";

const flightsAdapter = createEntityAdapter<Ticket>({
  selectId: (ticket) => ticket.id,
});

const initialState: State = flightsAdapter.getInitialState({
  filters: { airline: [], connections: [] },
  filteredFlights: [] as Ticket[],
  selectedFilters: { airlines: [], connections: [] },
  sortCriteria: SortCriteria.cheapest,
  loading: false,
  error: null,
});

const flightSlice = createSlice({
  name: "flights",
  initialState: initialState,
  reducers: {
    setFlights: flightsAdapter.upsertMany,

    setFilterOptions: (state) => {
      if (state.ids.length === 0) {
        return;
      }
      const tickets = state.ids.map((id) => state.entities[id]) as Ticket[];
      const uniqueAirlines = Array.from(
        new Set(tickets.map((ticket) => ticket && ticket.airline))
      );
      const uniqueConnections = Array.from(
        new Set(tickets.map((ticket) => ticket && ticket.connections))
      ).sort((a, b) => a - b);

      state.filters.airline = updateFilterOptions(
        state.filters.airline,
        uniqueAirlines,
        "airline"
      );
      state.filters.connections = updateFilterOptions(
        state.filters.connections,
        uniqueConnections,
        "connections"
      );
    },
    updateSelectedOptionNames: (state) => {
      state.selectedFilters.airlines = state.filters.airline
        .filter((option) => option.selected)
        .map((option) => option.airline as string);

      state.selectedFilters.connections = state.filters.connections
        .filter((option) => option.selected === true)
        .map((option) => option.connections as number);

    },
    updateFilterSelection: (state, action: PayloadAction<OptionFilter>) => {
      state.filters = updateFilterSelections(state.filters, action.payload);
    },
    filterTickets: (state) => {
      state.filteredFlights = Object.values(state.entities).filter((ticket) => {
        return (
          state.filters.airline.some((optionFilter) => {
            return (
              ticket &&
              optionFilter.airline === ticket.airline &&
              optionFilter.selected === true
            );
          }) &&
          state.filters.connections.some((optionFilter) => {
            return (
              ticket &&
              optionFilter.connections === ticket.connections &&
              optionFilter.selected === true
            );
          })
        );
      }) as Ticket[];
    },
    sortOptimalFlights: (state: State) => {
      state.sortCriteria = SortCriteria.optimal;
        state.filteredFlights = sortWithCurrCriteria(state.filteredFlights, state.sortCriteria)
    },
    sortCheapestFlights: (state: State) => {
      state.sortCriteria = SortCriteria.cheapest;
        state.filteredFlights = sortWithCurrCriteria(state.filteredFlights, state.sortCriteria)
    },
    sortFastestFlights: (state: State) => {
      state.sortCriteria = SortCriteria.fastest;
      state.filteredFlights = sortWithCurrCriteria(state.filteredFlights, state.sortCriteria)
    },
  },
});

export const {
  setFlights,
  setFilterOptions,
  updateSelectedOptionNames,
  updateFilterSelection,
  filterTickets,
  sortOptimalFlights,
  sortCheapestFlights,
  sortFastestFlights
} = flightSlice.actions;

export default flightSlice.reducer;
