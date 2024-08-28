import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//% düz javascript dosyalarının içerisinde hook'ları (useNavigate vb.) kullanamayız.
//% Sadece custom hook'larda ve component içerisinde kullanabiliyoruz.
//% düz js dosyalarında kullanabilmemiz için (dolaylı yol)
//% parametre olarak göndermemiz gerekiyor. Aşağıda da navigate'i parametre olarak yakalıyoruz.
//% register ve login sayfasından da gönderiyoruz.

export const createUser = async (email, password, navigate, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });
    await userCredential.user.reload();
    // başarılı olması durumunda ana sayfaya git diyoruz.
    toast.success("Registered successfully");
    navigate("/");
  } catch (error) {
    toast.error(error.code);
  }
};

export const logIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successfully");
    navigate("/");
  } catch (error) {
    toast.error(error.code);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logout successfully");
  } catch (error) {
    toast.error(error.code);
  }
};

export const userObserver = async (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
    } else {
      setCurrentUser(null);
    }
  });
};

export const signWithGoogle = async (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      toast.success("Login successfully");
      navigate("/");
    })
    .catch((error) => {
      toast.error(error.code);
    });
};

export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toast.success("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      if (err.code === "auth/missing-email") {
        toast("Please enter your email address!", {
          icon: "❗",
        });
      } else {
        toast.error(err.code);
      }
    });
};
