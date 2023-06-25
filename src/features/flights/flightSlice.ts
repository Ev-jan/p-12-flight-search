import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortCriteria, State, Ticket, OptionFilter } from "./interfaces";
import {
  filterWithCurrFilters,
  updateFilterOptions,
  updateFilterSelections,
  sortWithCurrCriteria,
} from "./helpers";

const initialState: State = {
  originalFlights: [],
  shownFlights: [],
  filters: { airline: [], connections: [] },
  selectedFilters: { airlines: [], connections: [] },
  sortCriteria: SortCriteria.cheapest,
  loading: false,
  error: null,
};

const flightSlice = createSlice({
  name: "flights",
  initialState: initialState,
  reducers: {
    setFlights(state, action: PayloadAction<Ticket[]>) {
      state.originalFlights.push(...action.payload);
    },
    setFilterOptions(state: State) {
      if (state.originalFlights.length === 0) {
        return;
      }
      const uniqueAirlines = Array.from(
        new Set(state.originalFlights.map((ticket) => ticket.airline))
      );
      const uniqueConnections = Array.from(
        new Set(state.originalFlights.map((ticket) => ticket.connections))
      ).sort((a,b)=> a - b);
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
    updateSelectedOptionNames(state: State) {
      state.selectedFilters.airlines = state.filters.airline
      .filter(option => option.selected)
      .map(option => option["airline"] as string);

      state.selectedFilters.connections = state.filters.connections
      .filter(option => option.selected)
      .map(
        (option) => option["connections"] as number
      );
    },
    updateFilterSelection(state: State, action: PayloadAction<OptionFilter>) {
      state.filters = updateFilterSelections(state.filters, action.payload);
    },
    updateShownFlights(state: State) {
      state.shownFlights = filterWithCurrFilters(
        state.filters,
        state.originalFlights
      );
      state.shownFlights = sortWithCurrCriteria(
        state.shownFlights,
        state.sortCriteria
      );
    },
    sortOptimalFlights(state) {
      state.sortCriteria = SortCriteria.optimal;
      state.shownFlights = sortWithCurrCriteria(
        state.shownFlights,
        state.sortCriteria
      );
    },
    sortCheapestFlights(state) {
      state.sortCriteria = SortCriteria.cheapest;
      state.shownFlights = sortWithCurrCriteria(
        state.shownFlights,
        state.sortCriteria
      );
    },
    sortFastestFlights(state) {
      state.sortCriteria = SortCriteria.fastest;
      state.shownFlights = sortWithCurrCriteria(
        state.shownFlights,
        state.sortCriteria
      );
    },
  },
});

export const {
  setFlights,
  setFilterOptions,
  updateFilterSelection,
  updateShownFlights,
  sortOptimalFlights,
  sortCheapestFlights,
  sortFastestFlights,
  updateSelectedOptionNames
} = flightSlice.actions;

export default flightSlice.reducer;
