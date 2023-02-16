import React from "react";
import styled from "styled-components";
import colors from "../vars/colors";
import { Link } from "react-router-dom";
import { typeColors } from "../helpers/helperFuncions";

interface TypeProps {
  name: string;
}

const TypeCard: React.FC<TypeProps> = ({ name }): JSX.Element => {
  return (
    <Link to={`/type/${name}`}>
      <TypeCardComponent
        className="shadow rounded"
        style={
          {
            "--my-color-var": typeColors(name),
          } as React.CSSProperties
        }
      >
        <Card
          className=" rounded"
          style={
            {
              "--my-color-var": typeColors(name),
            } as React.CSSProperties
          }
        >
          <Image
            style={{
              backgroundImage: `url(./assets/img/types/${name}.png)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "70%",
              backgroundPosition: "center",
            }}
          ></Image>
          <Name>{name}</Name>
          <Icon className="fa fa-search fa-3x"></Icon>
        </Card>
      </TypeCardComponent>
    </Link>
  );
};

export default TypeCard;

//// Styles

const TypeCardComponent = styled.div`
  overflow: hidden;
  height: 200px;
  width: 200px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 0 25px 1px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  background: ${colors.white};

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

const Card = styled.div`
  height: 160px;
  width: 160px;
  margin: 10px;
  padding: 10px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    var(--my-color-var) 100%
  );
`;
const Image = styled.div`
  width: 160px;
  height: 125px;
`;
const Name = styled.div`
  text-transform: capitalize;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.1px;
  margin-top: 10px;
  color: ${colors.black};
`;
const Icon = styled.i`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-2000px, -50%);
  color: ${colors.white};
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
  transition: 0.8s;
  transition-timing-function: ease-in;
  font-size: 80px;
`;
