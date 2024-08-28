import { useState } from "react";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { createUser, signWithGoogle } from "../auth/firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = `${firstName} ${lastName}`;
    await createUser(email, password, navigate, displayName);
  };

  const handleGoogleProvider = async () => {
    await signWithGoogle(navigate);
  };

  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center  bg-[#701A75] dark:bg-[#38393F]">
      <div
        className={`mt-[10vh] mx-auto overflow-hidden relative w-[380px] h-[640px] rounded-[8px] before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%] after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%] custom-linear-gradient before:bg-[linear-gradient(0deg,_transparent,_#000)] before:dark:bg-[linear-gradient(0deg,_transparent,_#ad2ab4)] before:origin-bottom-right before:animate-[animate_6s_linear_infinite] after:bg-[linear-gradient(0deg,_transparent,_#000)] after:dark:bg-[linear-gradient(0deg,_transparent,_#ad2ab4)] after:origin-bottom-right after:animate-[animate_6s_linear_infinite] after:[animation-delay:-3s]`}
      >
        <form
          className="absolute inset-[2px] rounded-[8px] bg-neutral-300 dark:bg-[#28292d] z-[10] form flex flex-col p-20"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[#701A75] dark:text-white text-2xl font-[500] text-center tracking-[0.1em]">
            Sign up
          </h2>
          <div className=" relative w-[300px] mt-[35px] inputbox">
            <input
              type="text"
              required
              className="inputbox-input relative w-[100%]  bg-transparent outline-none text-white font-[1em] tracking-[0.05em]"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span className="absolute left-0 inputbox-span font-[1em] text-[#8f8f8f] tracking-[0.05em]">
              First Name
            </span>
            <i className="absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#701A75]  rounded-[4px]"></i>
          </div>
          <div className="relative w-[300px] mt-[35px] inputbox">
            <input
              type="text"
              required
              className="relative w-[100%] inputbox-input bg-transparent outline-none text-white font-[1em] tracking-[0.05em]"
              onChange={(e) => setLastName(e.target.value)}
            />
            <span className="absolute left-0 inputbox-span font-[1em] text-[#8f8f8f] tracking-[0.05em]">
              Last Name
            </span>
            <i className="absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#701A75] rounded-[4px]"></i>
          </div>
          <div className="relative w-[300px] mt-[35px] inputbox">
            <input
              type="email"
              required
              className="relative w-[100%] inputbox-input bg-transparent outline-none text-white font-[1em] tracking-[0.05em]"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute left-0 inputbox-span font-[1em] text-[#8f8f8f] tracking-[0.05em]">
              Email
            </span>
            <i className="absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#701A75] rounded-[4px]"></i>
          </div>
          <div className="relative w-[300px] mt-[35px] inputbox">
            <input
              type="password"
              required
              className="relative w-[100%] inputbox-input bg-transparent outline-none text-white font-[1em] tracking-[0.05em]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute left-0 inputbox-span font-[1em] text-[#8f8f8f] tracking-[0.05em]">
              Password
            </span>
            <i className="absolute left-0 bottom-0 w-[100%] h-[2px] bg-[#701A75] rounded-[4px]"></i>
          </div>
          <div className="flex justify-end">
            {/* <span
              role="button"
              className="links-a font-[0.75em] cursor-pointer decoration-none text-[#8f8f8f]"
              onClick={() => forgotPassword(email)}
            >
              Forgot Password
            </span> */}
            <Link
              className="links-a font-[0.75em] cursor-pointer decoration-none  text-[#701a75] dark:text-white"
              to="/login"
            >
              Sign in
            </Link>
          </div>
          <input
            className="border-none outline-none bg-[#701A75] text-white custom-input w-[100px] mt-[10px] rounded-[4px] font-[600] cursor-pointer"
            type="submit"
            value="Register"
          />
          <button
            className="flex justify-between border-none outline-none bg-[#701A75]  text-white custom-input w-[300px] mt-[15px] rounded-[4px] font-[600] cursor-pointer"
            type="button"
            onClick={handleGoogleProvider}
          >
            Continue with Google
            <span className="pr-10">
              <GoogleIcon color="currentColor" />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

// % value'ları sonradan sıfırlamak istemiyorsak bir value'ya ihtiyacımız olmaz. Bundan dolayı yazmadık. Zaten bizi direk uygulamanın ana sayfasına yönlendirecek.
// % Required alanları onClick ile çalışmaz. type'ı submit vermemiz lazım. onClick ile submitte çalışmaz.
// % Google için type button verdik. Formu submit etmeye çalışmaması için.
