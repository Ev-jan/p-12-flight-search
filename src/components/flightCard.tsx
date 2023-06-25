import styled from "styled-components";
import { Ticket } from "../features/flights/interfaces";
import { processedTicket, airlineLogo, connectionLabel } from "../features/flights/helpers";
import { device } from "../theme";


const Card = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
padding: 40px;
padding-bottom: 25px;
background-color: rgba(232, 235, 242, 1);
border-radius: 10px;
width: 100%;

@media(${device.tablet}) {
    padding: 22px;
}

@media(${device.mobileM}) {
    padding: 18px;
}

`
const CardTopWrapper = styled.div`
    display: flex;
    max-width: 100%;
    justify-content: space-between;

    & [aria-label="Price"] {
        display: flex;
        font-size: 32px;
        font-weight: 700;
        line-height: 39px;
        text-align: left;
        color: #4E148C;
        margin-bottom: 25px;

        @media(${device.mobileM}) {
            font-size: 24px;
        }
    }

    & [aria-label="Airline"] > img {
            width: 100px;
            height: 40px;
            object-fit: contain;
        }
`
const RowGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
    @media(${device.mobileM}) {
        gap: 5px;
    }
`

const RowWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: start;
    font-size: 16px;
    font-weight: 500;
    color: #4E148C;    
    & + div {
    color: #858AE3;
    }
    @media(${device.mobileM}) {
        font-size: 14px;
    }
    @media(${device.mobileM}) {
        font-size: 12px;
    }
}
`
type FlightCardProps = {
    flight: Ticket;
}
const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
    const { from, to, airline, price, currency, startTime, endTime, duration, connections } = processedTicket(flight)
    return (
        <Card role="grid" aria-label="Ticket">
            <CardTopWrapper>
                <div aria-label="Price">{`${price} ${currency}`}</div>
                <div aria-label="Airline">{airlineLogo(airline)}</div>
            </CardTopWrapper>
            <RowGroupWrapper role="rowgroup">
                <RowWrapper role="row">
                    <div role="columnheader">{`${from} - ${to}`}</div>
                    <div role="columnheader">В пути</div>
                    <div role="columnheader">Пересадки</div>
                </RowWrapper>
                <RowWrapper role="row">
                    <div role="cell">{`${startTime} - ${endTime}`}</div>
                    <div role="cell">{duration}</div>
                    <div role="cell">{connectionLabel(connections)}</div>
                </RowWrapper>
            </RowGroupWrapper>
        </Card>
    )
}

export default FlightCard