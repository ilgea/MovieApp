import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { auth, userObserver } from "../auth/firebase";
import { onAuthStateChanged } from "firebase/auth";

// context'im create aşaması. başka sayfalarda kullanabilmek için export ediyoruz.
export const AuthContext = createContext();

// children bildiğimiz props aslında.
// sarmalladığımız tüm komponent'ler bir children'dır.
const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // console.log(currentUser);
  const [loading, setLoading] = useState(true);

  //% bu bir authentication olduğu için context'te user bilgisini tutacağız.

  //% bir nevi useEffect gibi çalışır.
  //% kullancının sign in olup olmadığını takip eden ve kullanıcı değiştiğinde
  //% yeni kullanıcıyı response olarak dönen metot
  //% kullancı varsa data'sını dönüyor. Yoksa false olarak dönüyor.

  //% onAuthStateChanged -> bu bir event listener'dır.
  //% bu event listener'ı kullanarak kullanıcının durumunu dinleyebiliriz.
  //% kullanıcı giriş yaptığında, çıkış yaptığında, kullanıcı değiştiğinde bu event listener tetiklenir.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // context'te tuttuğumuz user bilgisini burada güncelleyeceğiz.
  // çıkış yaptığında da currentUser'ın set işlemi ile içini boşaltacağız.

  const values = { currentUser };

  // AuthContext.Provider şeklinde kullanımı ise Providing aşaması oluyor.
  // Komponent içerisinde çağırıp kullanınca Consuming yapmış oluyoruz. Custom hook yazmış olsaydık, consuming'i burada yapmış olacaktık.
  //% sarmalamayı ise props'un içerisinde bulunan children özelliğini kullanarak yaparız.
  //% bu bir objedir. children dediğimiz ise LoginProvider'ın içerisindeki component'dir.
  // yani LoginProvider'ın içine aldığı hangi componentler varsa onlara props ile erişebiliriz.
  // props içerisinde bulunan children property'si ile erişebiliriz.
  // AuthContext.Provider -> Bu artık bir komponent oldu.
  // Dolayısı ile bu komponente göndereceğimiz tüm children'ları sarmallıyoruz.
  // context'in içerisine value'yı bir obje olarak gmnderiyoruz.

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
