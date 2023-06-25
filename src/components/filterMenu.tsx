import { ChevronIcon } from "../assets/icons";
import { useState } from "react"
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../store';
import Checkbox from "./checkbox";
import { updateFilterSelection, updateSelectedOptionNames, updateShownFlights } from "../features/flights/flightSlice";
import { connectionLabel } from "../features/flights/helpers";
import { device } from "../theme";

const Form = styled.form`
display: flex;
flex-direction: column;
flex-basis: 272px;
gap: 47px;
position: relative;
z-index: 0;


@media(${device.tablet}) {
    flex-flow: row wrap;
    gap: 0px;
    transform: translateY(-8px);
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    background-color: rgba(78, 20, 140, 1);
    color: rgba(247, 249, 247, 1);
  }
`

const FieldSet = styled.fieldset`
display: flex;
flex-direction: column;
justify-content: start;
align-items: start;
position: relative;
border: none;
background-color: rgba(232, 235, 242, 1);
width: 272px;
border-radius: 10px;
padding: 17px;

& label {
    display: flex;
    flex-flow: row-reverse nowrap;
    justify-content: flex-end;
    gap: 20px;
    margin-bottom: 22px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    color: rgba(133, 138, 227, 1);

}
&>div {
    margin-top: 53px;
}

@media(${device.tablet}) {
    background-color: transparent;
& label {
    color: rgba(247, 249, 247, 1);
}
  }
`
const Legend = styled.legend`
position: absolute;
inset: 19px 18px 0px 18px;
font-size: 20px;
font-weight: 700;
line-height: 24px;
text-align: left;
color: rgba(78, 20, 140, 1);
@media(${device.tablet}) {
    color: rgba(247, 249, 247, 1);
  }
`
const MenuBar = styled.div`
display: none;
width: 100%;
height: 44px;
border-radius: 10px;
background-color: rgba(78, 20, 140, 1);
font-size: 16px;
font-weight: 500;
line-height: 19px;
letter-spacing: 0em;
text-align: left;
padding: 0 23px;
color: rgba(247, 249, 247, 1);
position: relative;
z-index: 1;


& button {
    all: unset;
    display: flex;
    flex-flow: row nowrap;
    justify content: flex-start;
    align-items: center;
    font-size: 12px;
    & svg {
        margin-left: 17px;
    }
}
@media(${device.tablet}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
}

@media(${device.mobileL}) {
    font-size: 12px;

    & button > span {
        display: none;
  }

`

const FilterMenu: React.FC = () => {
    const dispatch = useDispatch();
    const [isHidden, setIsHidden] = useState(true);
    const allAirlines = useSelector((state: RootState) => state.flights.filters.airline);
    const allConnections = useSelector((state: RootState) => state.flights.filters.connections);
    const selectedAirlines = useSelector((state: RootState) => state.flights.selectedFilters.airlines);
    const selectedConnections = useSelector((state: RootState) => state.flights.selectedFilters.connections);

    const handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { value, checked } = event.currentTarget;
        let name: string | number = event.currentTarget.name;
        if (value === "connections") {
            name = parseInt(name)
        }
        dispatch(updateFilterSelection({ value, name, selected: checked }))
        dispatch(updateShownFlights())
        dispatch(updateSelectedOptionNames())
    };
    const toggleMenu = () => {
        isHidden ? setIsHidden(!isHidden) : setIsHidden(!isHidden)
    }

    const showSelectedAirlines = (): string => {
        if (allAirlines.length === selectedAirlines.length) {
            return "Любая авиакомпания"
        } else if(selectedAirlines.length === 0) {
            return "Авиакомпания не выбрана"
        } else {
            return `${selectedAirlines[0].toString().split(",").join(", ")}... + ещё ${selectedAirlines.length}`;
        }
    }

    const showSelectedConnections = (): string => {
        if (allConnections.length === selectedConnections.length) {
            return "любое ко-во пересадок"
        } else if(selectedConnections.length === 0) {
            return "ко-во пересадок не выбрано"
        } else {
            return `пересадки: ${selectedConnections.toString().split(",").join(", ")}`;
        }
    }

    return (
        <>
            <MenuBar>
                <span><span>{showSelectedAirlines()}</span>, <span>{showSelectedConnections()}</span></span>
                <button onClick={toggleMenu}>
                    <span>{!isHidden ? "Открыть " : "Скрыть "}настройки</span>
                    <ChevronIcon isClosed={isHidden}/>
                </button>
            </MenuBar>
            {isHidden && <Form action="submit" id="filterForm">
                <FieldSet>
                    <Legend>Количество пересадок</Legend>
                    <div>
                        {allConnections.map((connection, index) => (
                            <label htmlFor={`${connection["connections"]}`} key={index}>
                                {connectionLabel(connection["connections"] as number)}
                                <Checkbox
                                    id={`${connection["connections"]}`}
                                    value={"connections"}
                                    name={`${connection["connections"]}`}
                                    checked={connection.selected}
                                    onChange={handleCheckboxChange}
                                    variant={"4"}
                                />
                            </label>
                        ))}
                    </div>
                </FieldSet>
                <FieldSet>
                    <Legend>Компании</Legend>
                    <div>
                        {allAirlines.map((airline, index) => (
                            <label htmlFor={`${airline["airline"]}`} key={index}>
                                {airline["airline"]}
                                <Checkbox
                                    id={`${airline["airline"]}`}
                                    value={"airline"}
                                    name={`${airline["airline"]}`}
                                    checked={airline.selected}
                                    onChange={handleCheckboxChange}
                                    variant={"round"}
                                />
                            </label>
                        ))}
                    </div>

                </FieldSet>
            </Form>}

        </>
    )
}

export default FilterMenu
