import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NavbarComp from "../components/NavbarComp";
import MovieDetail from "../pages/MovieDetail";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* <NavbarComp /> -> bütün sayfalarda görünmesini istediğimiz için Routes'ın dışına koyduk */}
      {/* BrowserRouter içine koymamızın sebebi -> içerisinde react-router-dom elementlerini kullanabilmek için, Link, Navigate vb. */}

      <NavbarComp />
      {/* Route'larımızı sarmallıyoruz. 5. versiyonda switch-case yapıları olarak geçiyordu. */}
      {/* burada bizim case'imiz örneğin -> "/" , yani case "/" ise şu sayfayı render et. */}
      <Routes>
        {/* path'imiz "/" ise element olarak <Main/>'i render et diyoruz. 5. versiyonda element değil component olarak geçiyordu. */}
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* /details/:id -> dinamik bir yapıdır. yani /details/ 'den sonra ne gelirse gelsin <MovieDetail /> sayfasını render et.   */}
        <Route path="/details/:id" element={<PrivateRouter />}>
          <Route path="" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
