import React, { useEffect } from "react";
import styled from "styled-components";
import { pokemonTypesSelector } from "../store/pokemonTypesSlice";
import { resetPokemonsListReducer } from "../store/pokemonsListSlice";
import { useAppDispatch, useAppSelector } from "../vars/hooks";
import TypeCard from "./TypeCard";
import Logo from "../img/pokeapi.png";
import colors from "../vars/colors";

const PokemonTypesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const pokemonTypes = useAppSelector(pokemonTypesSelector);

  useEffect(() => {
    dispatch(resetPokemonsListReducer({}));
  }, [dispatch]);

  return (
    <PokemonTypesPageComponent className="container">
      <TitleRow className="row">
        <Image src={Logo} alt="PokeAPI" />
        <Title>Click on a Pokemon Type</Title>
      </TitleRow>
      <Row className="row">
        {pokemonTypes?.data?.map((pokeType) => (
          <Col key={pokeType?.name} className="col-md-auto">
            <TypeCard name={pokeType?.name} />
          </Col>
        ))}
      </Row>
    </PokemonTypesPageComponent>
  );
};

export default PokemonTypesPage;

const TitleRow = styled.div`
  text-align: center;
  padding-bottom: 30px;
`;
const Image = styled.img`
  max-width: 12vw;
  object-fit: contain;
  margin: 0 auto;
`;
const Title = styled.div`
  color: ${colors.electric};
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 1);
  margin-top: 10px;
`;
const PokemonTypesPageComponent = styled.div``;
const Row = styled.div`
  row-gap: 20px;
`;
const Col = styled.div``;
