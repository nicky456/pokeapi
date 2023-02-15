import colors from "../vars/colors";
import Logo from "../img/pokeapi.png";


export const typeColors = (type: string | undefined) => {
    const typeColor = Object.entries(colors).filter(
      ([key, _]) => key === type
    )[0];
    if (typeColor) {
      return typeColor[1];
    }
  };

  const FallbackImage = Logo;

export const imageOnLoadHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (event.currentTarget.className !== "error") {
    }
  };

export const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = FallbackImage;
  };