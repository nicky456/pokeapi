import React, { useEffect } from 'react';
import Loader from './components/Loader';
import { storedPokemonTypesSelector, getstoredPokemonTypes } from './store/stroredPokemonTypesSlice';
import { SliceStatus } from "./globals";
import { useAppDispatch, useAppSelector } from './vars/hooks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const PokemonTypesPage = React.lazy(() => import('./components/PokemonTypesPage'));



const App: React.FC =() =>{
  const dispatch = useAppDispatch();
  const storedPokemonTypes = useAppSelector(storedPokemonTypesSelector);


  useEffect(() => {
    dispatch(getstoredPokemonTypes());
  }, [dispatch]);

  return (
    <React.Suspense fallback={<Loader />}>
      <Router>
    <div className="App">
      {(storedPokemonTypes.status.state === SliceStatus.LOADING ||
      storedPokemonTypes.status.state === SliceStatus.IDLE) && <Loader/>}
        <Routes>
            <Route path="/" element={<PokemonTypesPage/>} />
            {/* <Route path="/type/:name" component={PokemonsListPage} /> */}
        </Routes>
    </div>
        </Router>
        </React.Suspense>
  );
}

export default App;
