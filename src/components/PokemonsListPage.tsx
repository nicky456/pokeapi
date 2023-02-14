import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../vars/colors";
import { useAppDispatch, useAppSelector } from "../vars/hooks";
import { SliceStatus } from "../globals";
import {
  pokemonsListSelector,
  getpokemonsList,
} from "../store/pokemonsListSlice";
import PokemonCard from "./PokemonCard";
import SearchInput from "./SearchInput";
import Loader from "./Loader";

const PokemonsListPage: React.FC = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const pokemonsList = useAppSelector(pokemonsListSelector);
  const pokemons = pokemonsList.data;
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemonsList, pokemons]);

  useEffect(() => {
    if (pokemonsList?.data?.length === 0) {
      dispatch(getpokemonsList({ type: type }));
    }
  }, [type, dispatch, pokemonsList?.data?.length]);

  const [query, setQuery] = useState("");

  console.log(query);

  useEffect(() => {
    if (query?.length < 3) {
      setFilteredPokemons(pokemons);
    } else if (query?.length >= 3) {
      setFilteredPokemons(
        pokemons?.filter((pokemon) => pokemon?.pokemon?.name?.includes(query))
      );
    }
  }, [query, pokemons]);

  return (
    <PokemonsListPageComponent className="container">
      {(pokemonsList.status.state === SliceStatus.LOADING ||
        pokemonsList.status.state === SliceStatus.IDLE) && <Loader />}
      <TitleRow className="row">
        <BackButton onClick={() => navigate(-1)}>
          <Icon className="fa fa-arrow-left fa-3x"></Icon>
        </BackButton>
        <Title>Search for a Pokemon</Title>
        <SearchInput query={query} setQuery={setQuery} />
        <Title> or select one below</Title>
      </TitleRow>
      <Row className="row">
        {filteredPokemons?.map((poke) => (
          <Col className="col-md-auto" key={poke?.pokemon?.name}>
            <>
              <PokemonCard name={poke?.pokemon?.name} type={type} />
            </>
          </Col>
        ))}
      </Row>
    </PokemonsListPageComponent>
  );
};

export default PokemonsListPage;

const TitleRow = styled.div`
  padding-bottom: 50px;
  padding-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
`;
const BackButton = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  cursor: pointer;
`;
const Icon = styled.i`
  color: #fff;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
  font-size: 30px;
`;
const Title = styled.div`
  color: ${colors.electric};
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 1);
  width: auto;
`;
const PokemonsListPageComponent = styled.div``;
const Row = styled.div`
  row-gap: 20px;
`;
const Col = styled.div``;
