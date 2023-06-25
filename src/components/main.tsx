import styled from "styled-components";
import FilterMenu from "./filterMenu";
import SortBar from "./sortbar";
import { setFilterOptions, setFlights, updateSelectedOptionNames, updateShownFlights } from './../features/flights/flightSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../store';
import { useEffect, useState } from "react";
import { useGetFlightsQuery } from "../features/api/apiSlice";
import { device } from "../theme";
import FlightCard from "./flightCard";
import Button from "./button";


const StyledMain = styled.main`
display: grid;
grid-template-columns: minmax(272px, 272px) auto;
grid-template-rows: 81px auto auto;
column-gap: 50px;
margin-bottom: 20px;

& > section:first-of-type {
    grid-column: 1/2;
    grid-row: 1/4;
    padding-bottom: 15px;
}
& > section:nth-of-type(2) {
    grid-column: 2/3;
    grid-row: 2/3;
}

@media(${device.tablet}){
    grid-template-columns: auto;
    & > div {
        grid-column: 1/2;
        grid-row: 1/2;
    }
    & > section:first-of-type {
        grid-column: 1/2;
        grid-row: 2/3
    }
    & > section:nth-of-type(2) {
        grid-column: 1/2;
        grid-row: 3/4
    }
}

`
const FlightSection = styled.section`
display: flex;
flex-direction: column;
gap: 47px;
position: relative;
z-index: 1;

`
const Main: React.FC = () => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    const { data, error, isLoading, refetch } = useGetFlightsQuery(page);
    const filteredFlights = useSelector((state: RootState) => state.flights.shownFlights);


    useEffect(() => {
        if (data) {
            dispatch(setFlights(data));
            dispatch(setFilterOptions());
            dispatch(updateShownFlights());
            dispatch(updateSelectedOptionNames())
        }
    }, [data, dispatch, isLoading, error]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    const handleLoadBtnClick = () => {
        setPage((page) => page + 1)
        refetch();
    }

    return (

        <StyledMain>
            <SortBar />
            <section>
                <FilterMenu />
            </section>
            <FlightSection>
                {isLoading ? (<div>Loading...</div>) : (filteredFlights.map((flight) => (
                    <FlightCard flight={flight} key={flight.id}/>
                )))}
                <Button 
                text="Загрузить ещё билеты"
                handleClick={handleLoadBtnClick}
                shape = "all-round-10"
                disabled={isLoading}
                active={false}/>
            </FlightSection>
        </StyledMain>

    )
}

export default Main