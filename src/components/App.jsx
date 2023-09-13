import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<SharedLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route> */}
      <Route path="/" element={<NotFound />} />
    </Routes>
  );
};
export default App;
