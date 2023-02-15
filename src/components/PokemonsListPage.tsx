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
import Checkbox from "./Checkbox";
import Loader from "./Loader";
import { catchedSelector } from "../store/catchSlice";

const PokemonsListPage: React.FC = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const catched = useAppSelector(catchedSelector);
  const pokemonsList = useAppSelector(pokemonsListSelector);
  const pokemons = pokemonsList.data;
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (pokemonsList?.data?.length === 0) {
      dispatch(getpokemonsList({ type: type }));
    }
  }, [type, dispatch, pokemonsList?.data?.length]);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemonsList, pokemons]);

  useEffect(() => {
    if (query?.length < 3) {
      setFilteredPokemons(pokemons);
    } else if (query?.length >= 3) {
      setFilteredPokemons(
        pokemons?.filter((pokemon) => pokemon?.pokemon?.name?.includes(query))
      );
    }
  }, [query, pokemons]);

  console.log(checked);
  console.log(catched);

  return (
    <PokemonsListPageComponent className="container">
      {(pokemonsList.status.state === SliceStatus.LOADING ||
        pokemonsList.status.state === SliceStatus.IDLE) && <Loader />}
      <TitleRow className="row">
        <BackButton onClick={() => navigate(-1)}>
          <Icon className="fa fa-arrow-left fa-3x"></Icon>
        </BackButton>
        <SearchInput query={query} setQuery={setQuery} />
        <Checkbox checked={checked} setChecked={setChecked} />
      </TitleRow>
      <Row className="row">
        {!checked &&
          filteredPokemons?.map((poke) => (
            <Col className="col-md-auto" key={poke?.pokemon?.name}>
              <>
                <PokemonCard name={poke?.pokemon?.name} type={type} />
              </>
            </Col>
          ))}
        {checked &&
          catched?.data?.map((poke) => (
            <Col className="col-md-auto" key={poke}>
              <>
                <PokemonCard name={poke} type={type} />
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
  align-items: center;
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
  color: ${colors.black};
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  font-size: 30px;
`;

const PokemonsListPageComponent = styled.div``;
const Row = styled.div`
  row-gap: 20px;
  justify-content: center;
`;
const Col = styled.div``;
