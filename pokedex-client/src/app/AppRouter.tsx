import { BrowserRouter, Route, Routes } from 'react-router';
import PokedexPage from '../features/pokedex/pages/PokedexPage';
import MainContainer from '../components/MainContainer';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainContainer/>}>
          <Route path="/" element={<PokedexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}