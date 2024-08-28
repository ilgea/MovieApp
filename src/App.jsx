import AuthContextProvider from "./context/AuthContextProvider";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    // <AuthContextProvider children={<AppRouter/>}/> aşağıdakine benzer bir yapıdır.
    // arasına koyduğumuz herşeyi children propu (default) ile yakalayabiliyoruz.
    <div>
      <AuthContextProvider>
        <Toaster
          position="top-right"
          containerStyle={{
            top: 60,
          }}
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            duration: 1500,
          }}
        />
        <AppRouter />
      </AuthContextProvider>
    </div>
  );
}

export default App;
