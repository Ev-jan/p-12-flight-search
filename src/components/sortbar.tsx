import styled from "styled-components";
import Button from "./button";
import { useDispatch, useSelector } from 'react-redux'
import { sortCheapestFlights, sortFastestFlights, sortOptimalFlights } from "../features/flights/flightSlice";
import { SortCriteria } from "../features/flights/interfaces";
import { RootState } from './../store';
import { device } from "../theme";



const StyledBar = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: auto;

&>button{
    transition: font-size .5s ease-in-out, width .5s ease-in-out;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
}

&>button:hover{
    font-size: 17px;
}

  @media(${device.mobileL}){
    margin-bottom: 12px;
    &>button {
      font-size: 12px;
  }
  &>button:hover{
    font-size: 12.5px;
}
}

`
const SortBar: React.FC= () => {

    const dispatch = useDispatch();
    const currentFilter= useSelector((state: RootState) => state.flights.sortCriteria);
    
    const sortCheapest = () => {
        dispatch(sortCheapestFlights())
      }
      const sortFastest = () => {
        dispatch(sortFastestFlights())
      }
      const sortOptimal = () => {
        dispatch(sortOptimalFlights())
      }

    return (
        <StyledBar>
            <Button 
            text="Самый дешевый"
            disabled={false}
            shape="roundLeft"
            handleClick={sortCheapest}
            active={currentFilter !== SortCriteria.cheapest}
            />
            <Button 
            text="Самый быстрый"
            handleClick={sortFastest}
            shape="4"
            disabled={false}
            active={currentFilter !== SortCriteria.fastest}
            />
            <Button 
            text="Самый оптимальный"
            handleClick={sortOptimal}
            shape="roundRight"
            disabled={false}
            active={currentFilter !== SortCriteria.optimal}
            />
        </StyledBar>

    )
}

export default SortBar