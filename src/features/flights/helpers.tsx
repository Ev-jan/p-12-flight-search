import {
  CurrentFlightOptions,
  OptionFilter,
  SortCriteria,
  Ticket,
  WeightedFlight,
} from "./interfaces";

export function calculateFlightScore(flight: Ticket): number {
  const priceWeight = 0.5;
  const travelTimeWeight = 0.3;
  const connectionsWeight = 0.2;

  const priceScore = flight.price * priceWeight;
  const travelTimeScore = flightDuration(flight.startTime, flight.endTime) * travelTimeWeight;
  const connectionsScore = flight.connections * connectionsWeight;

  return priceScore + travelTimeScore - connectionsScore;
}

function sortedOptimal(data: Ticket[]): Ticket[] {
  const weightedFlights = data.map((flight: Ticket): WeightedFlight => {
    const score = calculateFlightScore(flight);
    return { flight, score };
  });
  data = weightedFlights
    .sort((a, b) => b.score - a.score)
    .map((weightedFlight) => weightedFlight.flight);
  return data;
}

export function filterWithCurrFilters(
  filters: CurrentFlightOptions,
  data: Ticket[],
): Ticket[] {
  let filteredData = data;

  filteredData = filteredData.filter((ticket) =>
    filters.airline.some((optionFilter) =>
      optionFilter["airline"] === ticket.airline && optionFilter.selected === true
    )
  );

  filteredData = filteredData.filter((ticket) =>
    filters.connections.some((optionFilter) =>
      optionFilter["connections"] === ticket.connections && optionFilter.selected === true
    )
  );
  return filteredData;
}

export function sortWithCurrCriteria(
  data: Ticket[],
  sortCriteria: SortCriteria
): Ticket[] {
  let filteredData = data;

  switch (sortCriteria) {
    case "cheapest":
      filteredData = filteredData.sort((a, b) => a.price - b.price);
      break;
    case "fastest":
      filteredData = filteredData.sort((a, b) => flightDuration(a.startTime, a.endTime) - flightDuration(b.startTime, b.endTime));
      break;
    case "optimal":
      filteredData = sortedOptimal(filteredData);
      break;
    default:
      filteredData = filteredData.sort((a, b) => a.price - b.price);
  }

  return filteredData;
}

export function updateFilterSelections(
  filters: CurrentFlightOptions,
  payload: OptionFilter
): CurrentFlightOptions {
  const { selected, value, name } = payload;

  for (const optionFilters of Object.values(filters)) {
    const foundIndex = optionFilters.findIndex((option) => {
      if (option[value as string] !== name) {
        return false;
      }
      return true;
    });

    if (foundIndex !== -1) {
      optionFilters[foundIndex].selected = selected;
    }
  }

  return filters;
}

export function updateFilterOptions<T extends string | number>(
  options: OptionFilter[],
  uniqueItems: T[],
  property: keyof Ticket
) {
  const existingOptions = options.map((option) => option[property]);

  const newOptions = uniqueItems.filter(
    (item) => !existingOptions.includes(item)
  );

  newOptions.forEach((item) => {
    options.push({ [property]: item, selected: true });
  });
  return options
}

export function flightDuration(startTime: string, endtime: string): number {
  const start = Date.parse(startTime);
  const end = Date.parse(endtime);
  const delta = end - start;
  return delta
}

function convertToHHMM(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const duration = end.getTime() - start.getTime();

  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  return `${hours} ч ${minutes} мин`;
}

export const connectionLabel = (connection: number): string => {
  switch (connection) {
    case 0:
      return "Без пересадок";
    case 1:
      return "1 пересадка";
    case 2:
      return "2 пересадки";
    case 3:
      return "3 пересадки";
    case Infinity:
      return "Слишком много пересадок";
    default:
      return "";
  }
}

export const airlineLogo = (airlineName: string) => {
  switch (airlineName.toLowerCase()) {
    case "pobeda":
      return <img src="./src/assets/logo-pobeda.png" alt="pobeda airlines" />;
    case "s7":
      return <img src="./src/assets/logo-s77.png" alt="S7 airlines" />;
    case "red wings":
      return <img src="./src/assets/logo-redw.png" alt="red wings airlines" />;
    case "klm":
      return <img src="./src/assets/logo-klm.png" alt="klm airlines" />;
    case "british airways":
      return <img src="./src/assets/logo-british.png" alt="british airlines" />;
    default:
      return <>{airlineName}</>
  }
}

const airportName = (city: string): string => {
  return [...city].filter((char, index) => char !== "" && index % 2 !== 0 || index === 0).slice(0, 3).join("").toUpperCase();
}

export const processedTicket = (ticket: Ticket) => {
  const { from, to, airline, price, startTime, endTime, connections, id } = ticket;
  const formatter = new Intl.NumberFormat("ru-RU");
  const processedTicket = {
    from: airportName(from),
    to: airportName(to),
    airline: airline,
    price: formatter.format(Math.round(price * 70)),
    currency: "P",
    startTime: convertToHHMM(startTime),
    endTime: convertToHHMM(endTime),
    duration: formatDuration(startTime, endTime),
    connections: connections,
    id: id,
  }
  return processedTicket
}