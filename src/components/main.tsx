import styled from "styled-components";
import FilterMenu from "./filterMenu";
import SortBar from "./sortbar";
import { setFilterOptions, setFlights, updateSelectedOptionNames, filterTickets } from './../features/flights/flightSlice';
import { useEffect, useState } from "react";
import { useGetFlightsQuery } from "../features/api/apiSlice";
import { device } from "../theme";
import FlightCard from "./flightCard";
import Button from "./button";
import { getFilteredFlights, useAppDispatch, useAppSelector } from "../hooks";
import { Ticket } from "../features/flights/interfaces";


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
    const dispatch = useAppDispatch();
    const { data, error, isLoading, refetch } = useGetFlightsQuery(page);
    const filteredFlights = useAppSelector(getFilteredFlights) as Ticket[];


    useEffect(() => {
        if (data) {
            dispatch(setFlights(data));
            dispatch(setFilterOptions());
            dispatch(filterTickets());
            dispatch(updateSelectedOptionNames())
        }
    }, [data, dispatch, isLoading, error]);

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
                {isLoading ? (<div>Loading...</div>) : filteredFlights.length !== 0 ? (filteredFlights.map((flight) => (
                    <FlightCard flight={flight} key={flight.id} />
                ))) : (<div style={{margin: "0 auto"}}>Tickets not found</div>)}
                {filteredFlights.length !== 0 && <Button
                    text="Загрузить ещё билеты"
                    handleClick={handleLoadBtnClick}
                    shape="all-round-10"
                    disabled={isLoading}
                    active={false} />}
            </FlightSection>
        </StyledMain>

    )
}

export default Main