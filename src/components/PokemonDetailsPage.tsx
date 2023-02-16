import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../vars/colors";
import { SliceStatus } from "../store/globals";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPokemonById, pokemonSelector } from "../store/pokemonSlice";
import { typeColors } from "../helpers/helperFuncions";
import {
  imageOnLoadHandler,
  imageOnErrorHandler,
} from "../helpers/helperFuncions";
import Loader from "./Loader";
import {
  catchedSelector,
  catchPokemonReducer,
  releasePokemonReducer,
} from "../store/catchSlice";

const PokemonDetailsPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector(pokemonSelector);
  const catched = useAppSelector(catchedSelector);
  const pokemonDetails = pokemon?.data;
  const [isCatched, setIsCatched] = useState(false);

  //// Get and store the details of the selected Pokemon
  useEffect(() => {
    dispatch(getPokemonById({ pokemonId: name }));
  }, [dispatch, name]);

  //// Check if the Pokemon is already catched
  useEffect(() => {
    setIsCatched(catched?.data?.includes(pokemonDetails?.name.toString()));
  }, [catched?.data, pokemonDetails?.name]);

  //// Catch the Pokemon
  const catchPokemon = (name: string) => {
    dispatch(catchPokemonReducer(name));
  };

  //// Release the Pokemon
  const releasePokemon = (name: string) => {
    dispatch(releasePokemonReducer(name));
  };

  return (
    <PokemonsDetailsPageComponent className="container">
      {(pokemon.status.state === SliceStatus.LOADING ||
        pokemon.status.state === SliceStatus.IDLE) && <Loader />}
      <TitleRow className="row">
        <BackButton onClick={() => navigate(-1)}>
          <Icon className="fa fa-arrow-left fa-3x"></Icon>
        </BackButton>
      </TitleRow>
      <Row className="row">
        <PokeInfoBox className="col-lg-6 offset-lg-3 rounded shadow">
          <Row className="row ">
            <MainCol
              className="col-md-4"
              style={
                {
                  "--my-color-var": typeColors(
                    pokemonDetails?.types[0]?.type?.name
                  ),
                } as React.CSSProperties
              }
            >
              <Title>{pokemonDetails?.name}</Title>
              <PokeImage
                // Show a nice image of the Pokemon if available. If not use a logo placeholder
                src={`https://img.pokemondb.net/artwork/avif/${name}.avif`}
                onLoad={imageOnLoadHandler}
                onError={imageOnErrorHandler}
                alt={pokemonDetails?.name}
                width="150px"
                height="150px"
              ></PokeImage>
              <Typerow className="row">
                {pokemonDetails?.types?.map((type) => (
                  <Link to={`/type/${type?.type?.name}`} key={type?.type?.name}>
                    <TypeImage
                      src={`./assets/img/types/${type?.type?.name}.png`}
                      alt={type?.type?.name}
                    ></TypeImage>
                  </Link>
                ))}
              </Typerow>
            </MainCol>
            <DetailCol className="col-md-8">
              <>
                <Text>
                  <strong>Weight:</strong> {pokemonDetails?.weight}{" "}
                </Text>
                <Text>
                  <strong>Height:</strong> {pokemonDetails?.height}
                </Text>
                <Text>
                  <strong>Abilities:</strong>
                </Text>
                {pokemonDetails?.abilities?.map(
                  (ability) =>
                    !ability?.is_hidden && (
                      <p key={ability?.ability?.name}>
                        {" "}
                        {ability?.ability?.name}
                      </p>
                    )
                )}
                <MoreImages>
                  {pokemonDetails?.sprites?.front_default && (
                    <SubImageWrapper>
                      <SubImage
                        src={pokemonDetails?.sprites?.front_default}
                        alt={pokemonDetails?.name}
                      ></SubImage>
                      <Caption>Front</Caption>
                    </SubImageWrapper>
                  )}
                  {pokemonDetails?.sprites?.back_default && (
                    <SubImageWrapper>
                      <SubImage
                        src={pokemonDetails?.sprites?.back_default}
                        alt={pokemonDetails?.name}
                      ></SubImage>
                      <Caption>Back</Caption>
                    </SubImageWrapper>
                  )}
                  {pokemonDetails?.sprites?.front_female && (
                    <SubImageWrapper>
                      <SubImage
                        src={pokemonDetails?.sprites?.front_female}
                        alt={pokemonDetails?.name}
                      ></SubImage>
                      <Caption>Female front</Caption>
                    </SubImageWrapper>
                  )}
                  {pokemonDetails?.sprites?.back_female && (
                    <SubImageWrapper>
                      <SubImage
                        src={pokemonDetails?.sprites?.back_female}
                        alt={pokemonDetails?.name}
                      ></SubImage>
                      <Caption>Female back</Caption>
                    </SubImageWrapper>
                  )}
                </MoreImages>
                {!isCatched && (
                  <Button
                    onClick={() => catchPokemon(pokemonDetails?.name)}
                    className="rounded shadow"
                    style={{ background: colors.unknown }}
                  >
                    Catch
                  </Button>
                )}
                {isCatched && (
                  <Button
                    onClick={() => releasePokemon(pokemonDetails?.name)}
                    className="rounded shadow"
                    style={{ background: colors.red }}
                  >
                    Release
                  </Button>
                )}
              </>
            </DetailCol>
          </Row>
        </PokeInfoBox>
      </Row>
    </PokemonsDetailsPageComponent>
  );
};

export default PokemonDetailsPage;

//// Styles

const PokemonsDetailsPageComponent = styled.div``;
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
const Title = styled.div`
  color: ${colors.black};
  text-transform: capitalize;
  text-align: center;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: 1.5px;
`;
const Icon = styled.i`
  color: ${colors.black};
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  font-size: 30px;
`;
const Row = styled.div``;
const PokeInfoBox = styled.div`
  overflow: hidden;
`;

const MainCol = styled.div`
  background: linear-gradient(
    0deg,
    var(--my-color-var) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PokeImage = styled.img`
  width: 150px !important;
  height: 150px !important;

  object-fit: contain;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Typerow = styled.div`
  gap: 20px;
  margin-bottom: 20px;
  a {
    width: 50px;
    padding: 0;
  }
`;
const TypeImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;
const Text = styled.div`
  margin-top: 15px;
`;
const Button = styled.div`
  width: 100px;
  margin: 10px auto;
  padding: 10px 20px;
  color: ${colors.white};
  font-size: 20px;
  text-align: center;
  cursor: pointer;
`;
const DetailCol = styled.div`
  background: ${colors.white};
  padding: 20px;

  p {
    margin: 5px 0;
  }
`;
const MoreImages = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const SubImageWrapper = styled.div`
  width: 100px;
`;
const SubImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;
const Caption = styled.div`
  text-align: center;
  font-size: 12px;
`;
