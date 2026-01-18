import { Link } from "react-router";
import { FaShoppingCart, FaUser, FaReact } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
//import { IoMdArrowDropdown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import AuthMenu from "./AuthMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  const burgerRef = useOnClickOutside(() => {
    if (isOpen) setIsOpen(false);
  });

  const userCardRef = useOnClickOutside(() => {
    if (showUserCard) setShowUserCard(false);
  });

  const handleLogin = () => {
    fetch("http://localhost:8080/users/username", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((data) => {
        if (data) {
          setUsername(data);
          setIsLogged(true);
        }
      });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <nav className="w-full h-full p-8 flex flex-row justify-between items-center bg-brand text-surface font-semibold">
      <div className="flex flex-row items-center gap-4 text-lg ">
        <Link to="/">
          <FaReact className="hover:text-white" aria-label="Home" size={48} />
        </Link>
        <div className="sm:flex hidden">
          <Link
            to="/Products"
            aria-label="Products"
            className="hover:text-white p-2"
          >
            Products
          </Link>
        </div>
      </div>
      <div className="sm:flex flex-row items-center gap-4 hidden">
        <div className="relative">
          <input
            className="h-8 p-2 w-44 sm:w-56 bg-brand-light rounded-full focus:outline-none focus:ring-2 focus:ring-surface focus:text-surface placeholder:text-gray placeholder:w-20 placeholder:opacity-40 placeholder:text-white"
            type="text"
            id="product-search"
            placeholder="Search"
            aria-label="Search"
          />
          <FaSearch className="absolute bottom-2 left-49 opacity-40 text-white" />
        </div>
        <Link to="/Cart">
          <FaShoppingCart
            className="hover:text-white"
            aria-label="Cart"
            size={32}
          />
        </Link>
        {isLogged ? (
          <div
            className="flex items-center text-lg"
            aria-label="View user information"
          >
            Hello, {username}
            {/*<IoMdArrowDropdown size={28} />*/}
          </div>
        ) : (
          <div ref={userCardRef}>
            <button
              className="hover:cursor-pointer flex items-center"
              onClick={() => setShowUserCard(!showUserCard)}
            >
              <FaUser
                className="hover:text-white"
                aria-label="User Card"
                size={32}
              />
            </button>
            {showUserCard && <AuthMenu handleLogin={handleLogin} />}
          </div>
        )}
      </div>
      <div ref={burgerRef} className="sm:hidden">
        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <IoMenu aria-label="Menu" size={48} />
        </button>
        {isOpen && (
          <div className="absolute top-30 right-0 h-auto w-full bg-surface-dark">
            <div className="flex flex-col">
              <Link
                to="/Products"
                aria-label="Products"
                className="text-black p-5"
              >
                <AiFillProduct />
                Products
              </Link>
              <hr className="border-0 h-1 bg-surface" />
              <Link to="/Cart" aria-label="Cart" className="text-black p-5">
                <FaShoppingCart />
                Cart
              </Link>
              <hr className="border-0 h-1 bg-surface" />
              <Link
                to="/Account"
                aria-label="Account"
                className="text-black p-5"
              >
                <FaUser />
                Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
