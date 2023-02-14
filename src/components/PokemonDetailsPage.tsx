import React from "react";
import { useNavigate } from "react-router-dom";

const PokemonDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  return <div onClick={() => navigate(-1)}>Back</div>;
};

export default PokemonDetailsPage;
