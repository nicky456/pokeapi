import React, { useEffect } from "react";
import Loader from "./components/Loader";
import {
  pokemonTypesSelector,
  getpokemonTypes,
} from "./store/pokemonTypesSlice";
import { SliceStatus } from "./globals";
import { useAppDispatch, useAppSelector } from "./vars/hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonsListPage from "./components/PokemonsListPage";
import PokemonsDetailsPage from "./components/PokemonDetailsPage";
import { catchedSelector } from "./store/catchSlice";
const PokemonTypesPage = React.lazy(
  () => import("./components/PokemonTypesPage")
);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokemonTypes = useAppSelector(pokemonTypesSelector);

  useEffect(() => {
    dispatch(getpokemonTypes());
  }, [dispatch]);

  /// TO be deleted
  const catched = useAppSelector(catchedSelector);
  console.log(catched);

  return (
    <React.Suspense fallback={<Loader />}>
      <Router>
        <div className="App">
          {(pokemonTypes.status.state === SliceStatus.LOADING ||
            pokemonTypes.status.state === SliceStatus.IDLE) && <Loader />}
          <Routes>
            <Route path="/" element={<PokemonTypesPage />} />
            <Route path="/type/:type" element={<PokemonsListPage />} />
            <Route path="/pokemon/:name" element={<PokemonsDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </React.Suspense>
  );
};

export default App;
