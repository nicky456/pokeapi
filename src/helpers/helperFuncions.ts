import colors from "../vars/colors";
import Logo from "../img/pokeapi.png";

// Get the set color for the Pokemon type
export const typeColors = (type: string | undefined) => {
    const typeColor = Object.entries(colors).filter(
      ([key, _]) => key === type
    )[0];
    if (typeColor) {
      return typeColor[1];
    }
  };

// Check if image is available on the certain url
export const imageOnLoadHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (event.currentTarget.className !== "error") {
    }
  };

// If above image is not available replace with logo
export const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = Logo;
  };