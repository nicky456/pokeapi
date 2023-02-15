import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../vars/colors";
import { typeColors } from "../helpers/helperFuncions";
import {
  imageOnLoadHandler,
  imageOnErrorHandler,
} from "../helpers/helperFuncions";
import { useAppSelector } from "../vars/hooks";
import { catchedSelector } from "../store/catchSlice";

interface PokemonProps {
  name: string | undefined;
  type: string | undefined;
}

const PokemonCard: React.FC<PokemonProps> = ({ name, type }): JSX.Element => {
  const [isCatched, setIsCatched] = useState(false);
  const catched = useAppSelector(catchedSelector);

  useEffect(() => {
    return setIsCatched(catched?.data?.includes(name!));
  }, [catched?.data, name]);

  return (
    <Link to={`/pokemon/${name}`}>
      <PokemonCardComponent
        className="shadow rounded"
        style={
          {
            "--my-color-var": typeColors(type),
            background: isCatched
              ? colors.red
              : `linear-gradient(0deg, rgba(255, 255, 255, 1) 0%,${typeColors(
                  type
                )} 100%)`,
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
            src={`https://img.pokemondb.net/artwork/avif/${name}.avif`}
            onLoad={imageOnLoadHandler}
            onError={imageOnErrorHandler}
            alt={name}
          ></Image>
          <Name>{name}</Name>
          <Icon className="fa fa-info-circle fa-3x"></Icon>
        </Card>
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
  height: 260px;
  width: 200px;
  position: relative;
  cursor: pointer;
  background-color: var(--my-color-var);
  box-shadow: 0 0 25px 1px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  /* background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    var(--my-color-var) 100%
  ) */
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
  height: 220px;
  width: 160px;
  margin: 10px;
  padding: 10px;
  background: ${colors.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Image = styled.img`
  width: 160px;
  height: 125px;
  object-fit: contain;
`;
const Name = styled.div`
  text-align: center;
  text-transform: capitalize;
  color: ${colors.black};
  margin-top: 20px;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 1px;
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
