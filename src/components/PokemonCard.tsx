import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../vars/colors";

interface PokemonProps {
  name: string | undefined;
  type: string | undefined;
}

const PokemonCard: React.FC<PokemonProps> = ({ name, type }): JSX.Element => {
  const fontColors = (type: string | undefined) => {
    const fontColor = Object.entries(colors).filter(
      ([key, _]) => key === type
    )[0];
    if (fontColor) {
      return fontColor[1];
    }
  };

  return (
    <Link to={`/pokemon/${name}`}>
      <PokemonCardComponent
        className="shadow rounded"
        style={
          {
            "--my-color-var": fontColors(type),
          } as React.CSSProperties
        }
      >
        <Name>{name}</Name>
        <Icon className="fa fa-info-circle fa-3x"></Icon>
      </PokemonCardComponent>
    </Link>
  );
};

export default PokemonCard;

const PokemonCardComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  padding: 20px;
  height: 100px;
  width: 200px;
  position: relative;
  cursor: pointer;
  background-color: var(--my-color-var);
  box-shadow: 0 0 25px 1px rgba(0, 0, 0, 0.3);
  transition: 0.5s;

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 500px;
    transform: translate(-140%, -50%);
    background-color: ${colors.black};
    opacity: 0.8;
    border-radius: 50%;
    transition: 0.8s;
  }

  &:hover::after {
    transform: translate(-50%, -50%);
  }

  &:hover i {
    transform: translate(-50%, -50%);
    transition-timing-function: ease;
  }
`;

const Name = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-transform: uppercase;
  text-align: center;
  color: ${colors.white};
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 1.8px;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
`;
const Icon = styled.i`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-2000px, -50%);
  color: #fff;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
  transition: 0.8s;
  transition-timing-function: ease-in;
  font-size: 60px;
`;
