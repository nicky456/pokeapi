import React from "react";
import styled from "styled-components";
import colors from "../vars/colors";

interface TypeProps {
  name: string;
}

const TypeCard: React.FC<TypeProps> = ({ name }): JSX.Element => {
  const fontColors = (name: string) => {
    const fontColor = Object.entries(colors).filter(
      ([key, _]) => key === name
    )[0];
    if (fontColor) {
      return fontColor[1];
    }
  };

  return (
    <TypeCardComponent
      className="shadow rounded"
      style={
        {
          "--my-color-var": fontColors(name),
          backgroundImage: `url(/assets/img/types/${name}.png)`,
          backgroundRepeat: "no-repeat",
          width: "250px",
          backgroundPosition: "center",
        } as React.CSSProperties
      }
    >
      <Name style={{ color: fontColors(name) }}>{name}</Name>
      <Icon className="fa fa-search fa-3x"></Icon>
    </TypeCardComponent>
  );
};

export default TypeCard;

const TypeCardComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  overflow: hidden;
  padding: 20px;
  height: 250px;
  width: 250px;
  position: relative;
  cursor: pointer;
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
    background-color: var(--my-color-var);
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
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.1px;
  margin-top: 10px;
`;
const Icon = styled.i`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-2000px, -50%);
  color: #fff;
  transition: 0.8s;
  transition-timing-function: ease-in;
  font-size: 80px;
`;
