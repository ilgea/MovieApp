import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/icons/avatar.png";
import { auth, logout } from "../auth/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Switch from "./Switch";
import toast from "react-hot-toast";

const NavbarComp = () => {
  // obje olarak gönderdiğimiz value'den değeri dist. ederek çıkarıyoruz.
  const { currentUser } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("currentUser");
  };

  const handleMainTitle = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar
        fluid
        rounded
        className="w-full fixed top-0 z-[50] bg-fuchsia-200 "
      >
        <div onClick={handleMainTitle} className="cursor-pointer">
          <span className=" self-center whitespace-nowrap lg:text-3xl  md:text-2xl sm:text-xl font-semibold dark:text-white">
            React Movie App
          </span>
        </div>

        <div className="flex md:order-2">
          <Switch />
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                size={"sm"}
                img={currentUser?.photoURL || avatar}
                rounded
                // google profil resmini çekerken güvenlikten dolayı çekemediği zaman
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            }
          >
            {!isLoggedIn && (
              <>
                <Link to={"/register"}>
                  <Dropdown.Item>Register</Dropdown.Item>
                </Link>
                <Link to={"/login"}>
                  <Dropdown.Item>Login</Dropdown.Item>
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Dropdown.Item>
                  {auth?.currentUser?.displayName || ""}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Link onClick={handleLogout}>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Link>
              </>
            )}
          </Dropdown>
        </div>
      </Navbar>
      <div className="h-[60px]"></div>
    </>
  );
};

export default NavbarComp;
