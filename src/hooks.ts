import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'


type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const getAllAirlines = (state: RootState) => state.flights.filters.airline;
export const getAllConnections = (state: RootState) => state.flights.filters.connections;
export const getSelectedAirlines = (state: RootState) => state.flights.selectedFilters.airlines;
export const getSelectedConnections = (state: RootState) => state.flights.selectedFilters.connections;
export const getCurrentFilter = (state: RootState) => state.flights.sortCriteria;
export const getFilteredFlights = (state: RootState) => state.flights.filteredFlights;

