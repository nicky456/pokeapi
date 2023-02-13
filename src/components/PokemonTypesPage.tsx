import React from "react";
import styled from "styled-components";
import { storedPokemonTypesSelector } from "../store/stroredPokemonTypesSlice";
import { useAppSelector } from "../vars/hooks";
import TypeCard from "./TypeCard";

const PokemonTypesPage: React.FC = () => {
  const storedPokemonTypes = useAppSelector(storedPokemonTypesSelector);
  console.log(storedPokemonTypes);

  return (
    <PokemonTypesPageComponent className="container">
      <Row className="row">
        {storedPokemonTypes?.data?.map((pokeType) => (
          <Col key={pokeType?.name} className="col-md-auto">
            <TypeCard name={pokeType?.name} />
          </Col>
        ))}
      </Row>
    </PokemonTypesPageComponent>
  );
};

export default PokemonTypesPage;

const PokemonTypesPageComponent = styled.div``;
const Row = styled.div`
  row-gap: 20px;
`;
const Col = styled.div``;
