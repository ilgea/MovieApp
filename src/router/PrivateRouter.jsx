import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { currentUser } = useContext(AuthContext);
  // detail'den login'e geldik. replace ile detail yerine history stack'de login geldiği için bir geri yaparak ana sayfaya gidebiliyoruz.
  // yoksa sürekli detail'e gitmeye çalışırdı. doğal olarak da login sayfasında takılı kalırdı.
  // çünkü detail'e gitmeden önce ana sayfadaydık. detail yerine login alınca bir gerisi ana sayfa oluyor.

  // if (currentUser === null) {
  //   return (
  //     <div
  //       className="spinner-border animate-spin flex w-10 h-10 border-4 rounded-full text-2xl text-blue-600 mt-52 mx-auto"
  //       role="status"
  //     >
  //       <span className="visually-hidden">Loading...</span>
  //     </div>
  //   );
  // }

  return currentUser ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRouter;
